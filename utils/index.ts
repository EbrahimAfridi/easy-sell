export const getCanonicalUrl = () => {
  return process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://nextjs-crash-course-theta.vercel.app";
};

export const getImageUrl = (image_url: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/EASY-SELL-STORAGE/${image_url}`;
};
