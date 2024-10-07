import { useEffect, useState } from "react";

// Define the interface for CartItem
interface CartItem {
  quantity: number;
  // You can add more properties if necessary
}

// Define the structure for CartData
interface CartData {
  cartItems: CartItem[];
  message?: string;
}

export const useCartQuantity = (
  userName: string | null | undefined
): number => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    if (!userName) {
      console.error("Username is missing");
      return;
    }

    const fetchCartData = async () => {
      try {
        const response = await fetch(`/api/cart?userName=${userName}`);

        if (!response.ok) {
          console.error(
            "Failed to fetch cart data. HTTP Status:",
            response.status
          );
          return;
        }

        const data: CartData = await response.json();

        if (data.cartItems) {
          // Safely calculate the total quantity by validating each item
          const total = data.cartItems.reduce((sum, item) => {
            const quantity = Number(item.quantity);
            return sum + (isNaN(quantity) ? 0 : quantity); // Validate if quantity is a valid number
          }, 0);

          setTotalQuantity(total);
        } else {
          console.error("No cart items found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [userName]);

  return totalQuantity;
};
