"use client";

import { ThemeProvider } from "next-themes";
import "../../styles/global.css";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}
