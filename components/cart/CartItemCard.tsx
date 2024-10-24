"use client";

import { CartItem } from "@/types/cart";
import { useEffect, useState } from "react";

interface CartItemCardProps {
  userName: string | undefined | null;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ userName }) => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

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
  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b">
      <div className="w-2/5 flex">
        <div className="w-20">
          <img className="h-24" src="/path/to/image" />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">Title</span>
        </div>
      </div>
      <div className="w-1/5">
        <span className="flex justify-center items-center">2</span>
      </div>
      <div className="w-1/5 text-center">
        <span className="text-sm">$50</span>
      </div>
      <div className="w-1/5 text-center">
        <span className="text-sm">$1250</span>
      </div>
    </div>
  );
};

export default CartItemCard;
