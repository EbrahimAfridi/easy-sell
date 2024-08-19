import type { Metadata } from "next";
import { Nunito, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getCanonicalUrl } from "@/utils";

const nunitoDefaultFont = Nunito({ subsets: ["latin"] });
const cuteFont = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(getCanonicalUrl()),
  title: "Easy Sell",
  description:
    "Easy Sell is a platform to sell your products easily. No hassle. No fees. Just sell.",
  openGraph: {
    images: ["/assets/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoDefaultFont.className}>
        <Header font={cuteFont.className} />
        <div className="bg-gray-951 py-12 px-4">{children}</div>
        <Footer font={cuteFont.className} />
      </body>
    </html>
  );
}
