import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doftopia",
  description: "Your multi tool for all things fragrance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#cfc4ab] dark:bg-dark-2 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
