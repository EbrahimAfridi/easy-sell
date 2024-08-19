import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getCanonicalUrl } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Sell",
  description:
    "Easy Sell is a platform to sell your products easily. No hassle. No fees. Just sell.",
  openGraph: {
    images: [`${getCanonicalUrl()}/assets/og-image.png`],
  },
  alternates: {
    canonical: getCanonicalUrl(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="bg-gray-951 py-12 px-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
