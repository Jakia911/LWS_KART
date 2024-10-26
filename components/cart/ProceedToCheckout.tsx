"use client";

import { CartItem } from "@/types/cart";
import Link from "next/link";
import { useEffect, useState } from "react";
interface ProceedToCheckoutProps {
  userName?: string | undefined | null;
}
const ProceedToCheckout: React.FC<ProceedToCheckoutProps> = ({ userName }) => {
  const [subTotal, setSubTotal] = useState<number>(0);
  let shipping: number = 50;

  const total = Number(subTotal + shipping);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await fetch(`api/cart?userName=${userName}`);
        const data = await res.json();

        if (data.cartItems) {
          const totalAmount = data?.cartItems?.reduce(
            (sum: number, item: CartItem) => {
              const price = Number(item.price);
              const quantity = Number(item.quantity);

              const totalSum =
                sum + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);

              return totalSum;
            },
            0
          );

          setSubTotal(totalAmount);
        } else {
          console.log("no cart data found", data.messege);
        }
      } catch (err) {
        console.log("error while fetching data");
      }
    };
    fetchCartData();
  }, [userName]);

  return (
    <div
      id="summary"
      className=" lg:w-1/4 w-full px-8 py-10 border border-[#ddd] rounded-md shadow-md"
    >
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div className="flex justify-between  mb-5 border-b mt-[23px] pb-[23px]">
        <span className="font-semibold text-sm uppercase">SubTotal</span>
        <span className="font-semibold text-sm">${subTotal}</span>
      </div>
      <div className="flex justify-between  mb-5 border-b mt-[23px] pb-[23px]">
        <span className="font-semibold text-sm uppercase">Shipping</span>
        <span className="font-semibold text-sm">${shipping}</span>
      </div>
      <div className="flex justify-between  mb-5 border-b mt-[23px] pb-[23px]">
        <span className="font-semibold text-sm uppercase">Total</span>
        <span className="font-semibold text-sm">${total}</span>
      </div>
      <div className="mt-[30px]">
        <Link href="/checkout">
          <button className="bg-[#FD3D57] hover:bg-[#fd3d57e6] py-3 text-sm text-white uppercase w-full rounded-md">
            Proceed To Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProceedToCheckout;
