import { WishlistItem } from "@/types/wishList";
import { useEffect, useState } from "react";
interface WishlistData {
  wishlistItems: WishlistItem[];
  message?: string;
}

export const useWishlistQuantity = (
  userName: string | null | undefined
): number => {
  const [totalWquantity, setTotalWquantity] = useState<number>(0); // Fixed number type

  useEffect(() => {
    if (!userName) {
      console.log("Username is not found");
      return;
    }

    const fetchWishlistData = async () => {
      try {
        const response = await fetch(`/api/wishlist?userName=${userName}`); // Updated URL

        if (!response.ok) {
          console.error(
            "Failed to fetch wishlist data. HTTP Status:",
            response.status
          );
          return;
        }

        const data: WishlistData = await response.json();

        if (data.wishlistItems) {
          // Safely calculate the total quantity by validating each item
          const total = data.wishlistItems.reduce((sum, item) => {
            const quantity = Number(item.wQuantity);
            return sum + (isNaN(quantity) ? 0 : quantity); // Validate if quantity is a valid number
          }, 0);

          setTotalWquantity(total); // Update the state with the total quantity
        } else {
          console.error("No wishlist items found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchWishlistData(); // Fetch the data when the component mounts
  }, [userName]); // Add userName as a dependency

  return totalWquantity; // Return the total quantity
};
