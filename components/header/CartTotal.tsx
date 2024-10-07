"use client";

import { useCartQuantity } from "@/hooks/useCartQuantity";
import React from "react";

interface userType {
  userName: string | null | undefined;
}
const CartTotal: React.FC<userType> = ({ userName }) => {
  const totalQuantity = useCartQuantity(userName);
  console.log(totalQuantity);

  return (
    <>
      <div className="text-2xl">
        <i className="fa-solid fa-bag-shopping"></i>
      </div>
      <div className="text-xs leading-3">Cart</div>
      <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
        {totalQuantity}
      </div>
    </>
  );
};

export default CartTotal;
