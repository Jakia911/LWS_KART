import { createContext, useContext, useEffect, useState } from "react";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  wQuantity: number;
}

interface WishlistContextProps {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  incrementWishlistItem: (id: string) => void;
  getTotalItems: () => number;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

// Cart Provider component
export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load cart from local storage on initial load
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add a new product to the cart
  const addToWishlist = async (product: WishlistItem) => {
    setWishlist((prevWishlist) => {
      const existingProduct = prevWishlist.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        return prevWishlist.map((item) =>
          item.id === product.id
            ? { ...item, wQuantity: item.wQuantity + 1 }
            : item
        );
      }
      return [...prevWishlist, { ...product, wQuantity: 1 }];
    });
  };

  // Increment the wQuantity of an existing product in the cart
  const incrementWishlistItem = (id: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.map((item) =>
        item.id === id ? { ...item, wQuantity: item.wQuantity + 1 } : item
      )
    );
  };

  // Get the total number of items in the cart
  const getTotalItems = () => {
    return wishlist.reduce((total, item) => total + item.wQuantity, 0);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, incrementWishlistItem, getTotalItems }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
