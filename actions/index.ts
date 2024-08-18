"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export async function sellYourItemAction(prevState: any, formData: FormData) {
  console.log({ prevState });
  console.log(formData.get("name"));
  console.log(formData.get("description"));
  console.log(formData.get("price"));
  console.log(formData.get("image_url"));

  const schema = z.object({
    name: z.string().min(6),
    description: z.string().min(10),
    contact_email: z.string().min(1).email("This is not a valid email address"),
    price: z.string().min(1),
    image_url: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  });
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    contact_email: formData.get("contact_email"),
    price: formData.get("price"),
    image_url: formData.get("image_url"),
  });

  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  const { name, description, price, image_url, contact_email } = validatedFields.data;

  try {
    const fileName = `${Math.random()}-${image_url.name}`;

    const supabase = createServerActionClient({ cookies });
    const { data, error } = await supabase.storage
      .from("EASY-SELL-STORAGE")
      .upload(fileName, image_url, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      return {
        type: "error",
        message: "Database Error: Failed to Upload Image.",
      };
    }

    if (data) {
      const path = data.path;

      const { data: products } = await supabase
        .from("easysell-products")
        .insert({ name, description, price, image_url: path, contact_email });

      console.log({ products });
    }
  } catch (e) {
    return {
      type: "error",
      message: "Database Error: Failed to Create Product.",
    };
  }

  revalidatePath("/");
  redirect("/");
}
