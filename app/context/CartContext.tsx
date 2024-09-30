import { createContext, useContext, useEffect, useState } from "react";

// Define types for cart items and cart context
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<void>;
  incrementCartItem: (id: string) => void;
  getTotalItems: () => number;
}

// Create the Cart Context
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Cart Provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from local storage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a new product to the cart
  const addToCart = async (product: CartItem): Promise<void> => {
    // Update local state first
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Send updated cart data to the backend for persistence
    try {
      const response = await fetch(`/api/cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product), // Send product data to the backend
      });

      if (!response.ok) {
        throw new Error("Failed to add product to the database");
      }

      // Optionally, handle the backend response here
      const data = await response.json();
      console.log("Product added to cart in database", data);
    } catch (error) {
      console.error("Error adding product to the cart:", error);
    }
  };

  // Increment the quantity of an existing product in the cart
  const incrementCartItem = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Get the total number of items in the cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, incrementCartItem, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};