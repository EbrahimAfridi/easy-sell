import Card from "@/components/card";

export default function Home() {
  const products = [
    {
      id: 0,
      name: "Product Name",
      description: "Product Description",
      price: 0,
      imageUrl: "https://via.placeholder.com/300",
    },
  ];
  
  return (
    <main className="min-h-screen mx-auto max-w-[100rem]">
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </main>
  );
}
