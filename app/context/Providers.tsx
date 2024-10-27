"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import "../../styles/global.css";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";

interface ProvidersProps {
  children: React.ReactNode;
  session?: any; // Define a more specific type based on your session object
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider session={session}>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
