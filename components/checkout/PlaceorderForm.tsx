"use client";

import { CartItem } from "@/types/cart";
import { useEffect, useState } from "react";

interface PlaceOrderprops {
  userName: string | undefined | null;
}
interface CartData {
  cartItems: CartItem[];
  message?: string;
}
const PlaceorderForm: React.FC<PlaceOrderprops> = ({ userName }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

        const data = await response.json();
        setCart(data.cartItems);

        // get total amount of product
        if (data.cartItems) {
          // Safely calculate the total quantity by validating each item
          const total = data.cartItems.reduce((sum: number, item: CartItem) => {
            const quantity = Number(item.quantity);
            const price = Number(item.price);
            const totalSum =
              sum + (isNaN(quantity) || isNaN(price) ? 0 : quantity * price);
            return totalSum;
          }, 0);

          setTotalPrice(total);
        } else {
          console.error("No cart items found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [userName]);
  console.log(cart);
  return (
    <div className="container  lg:mx-20">
      {/* <div className="col-span-8 border border-gray-200 p-4 rounded">
        <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
      </div> */}

      <div className="w-[70%] border border-gray-200 p-4 rounded">
        <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
          order summary
        </h4>
        <div className="space-y-2">
          {cart.map((prod) => (
            <div className="flex justify-between">
              <div>
                <h5 className="text-gray-800 font-medium">{prod?.name}</h5>
                <p className="text-sm text-gray-600">Size: M</p>
              </div>
              <p className="text-gray-600">x3</p>
              <p className="text-gray-800 font-medium">{prod?.price}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
          <p>subtotal</p>
          <p>$1280</p>
        </div>

        <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
          <p>shipping</p>
          <p>Free</p>
        </div>

        <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
          <p className="font-semibold">Total</p>
          <p>${totalPrice}</p>
        </div>

        <div className="flex items-center mb-4 mt-2">
          <input
            type="checkbox"
            name="aggrement"
            id="aggrement"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
          />
          <label className="text-gray-600 ml-3 cursor-pointer text-sm">
            I agree to the
            <a href="#" className="text-primary">
              terms & conditions
            </a>
          </label>
        </div>

        <a
          href="#"
          className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
        >
          Place order
        </a>
      </div>
    </div>
  );
};

export default PlaceorderForm;
