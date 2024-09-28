import MainNav from "@/components/header/MainNav";
import TopNav from "@/components/header/TopNav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./context/CartContext";
// import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNav />
        <MainNav />
        <CartProvider>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
