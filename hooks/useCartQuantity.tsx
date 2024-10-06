import { useEffect, useState } from "react";

export const useCartQuantity = (userName) => {
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`/api/cart?userName=${userName}`);
        const data = await response.json();

        if (response.ok && data.cartItems) {
          // Calculate the total quantity
          const total = data.cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          setTotalQuantity(total);
        } else {
          console.error("Failed to fetch cart data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [userName]);

  return totalQuantity;
};
