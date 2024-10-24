"use client";

import { CartItem } from "@/types/cart";
import Image from "next/image";
import { useEffect, useState } from "react";
import remove from "../../public/images/remove.svg";

interface CartItemCardProps {
  userName?: string | undefined | null;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ userName }) => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await fetch(`api/cart?userName=${userName}`);
        const data = await res.json();

        setCartData(data.cartItems);
      } catch (err) {
        console.log("error while fetching data");
      }
    };
    fetchCartData();
  }, [userName]);

  console.log(cartData);

  //handle quantity increment
  const handleIncrement = async (cart: CartItem) => {
    const updatedCart = {
      userName: userName,
      productId: cart?.productId,
      action: "increment",
    };
    console.log(updatedCart);
    try {
      const res = await fetch(`api/cart/`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedCart),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Cart quantity failed to increment");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //handle quantity decrement
  const handleDecrement = async (cart: CartItem) => {
    const updateCart = {
      userName: userName,
      productId: cart?.productId,
      action: "decrement",
    };
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCart),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to increment quantity");
      }

      // Update the UI with the new quantity
      console.log("Product quantity incremented:", data.newQuantity);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  //handle remove cartItem
  const handleRemove = async (cart: CartItem) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/cart?productId=${cart.productId}&userName=${userName}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to remove cart item");
      }

      console.log("Cart item removed successfully");
      // Optionally update the cart state in your app here
    } catch (error: any) {
      setError(error.message);
      console.error("Error removing cart item:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {cartData.length > 0 ? (
        cartData.map((cart) => (
          <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b">
            <div className="w-2/5 flex items-center">
              <div className="w-20">
                <img
                  className="h-[80px] w-[80px] rounded-md"
                  src={cart?.image}
                />
              </div>
              <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm">{cart?.name}</span>
              </div>
            </div>
            <div className="w-1/5 flex justify-center items-center">
              <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max  ">
                <div
                  onClick={() => handleDecrement(cart)}
                  className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                >
                  -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                  {cart?.quantity}
                </div>
                <div
                  onClick={() => handleIncrement(cart)}
                  className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                >
                  +
                </div>
              </div>
              {/* <span className="flex justify-center items-center"></span> */}
            </div>
            <div className="w-1/5 text-center">
              <span className="text-sm">{cart?.price}</span>
            </div>
            <div className="w-1/5 text-center">
              <span className="text-sm">$1250</span>
            </div>
            <div className="w-1/5 text-center flex items-center justify-center">
              <button
                className="text-sm cursor-pointer"
                onClick={() => handleRemove(cart)}
              >
                <Image
                  src={remove}
                  width={20}
                  height={20}
                  alt="remove button"
                />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No products Found</p>
      )}
    </>
  );
};

export default CartItemCard;
