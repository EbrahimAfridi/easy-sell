import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Sell - Upload",
  description: "Upload your files easily using Easy Sell",
  alternates: {
    canonical: "/products/upload",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}
