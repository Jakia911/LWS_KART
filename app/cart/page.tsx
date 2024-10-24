import { authOptions } from "@/auth";
import CartItemCard from "@/components/cart/CartItemCard";
import ProceedToCheckout from "@/components/cart/ProceedToCheckout";
import { getServerSession } from "next-auth";

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  const userName: string | undefined | null = session?.user?.name;

  return (
    <div className="container mx-auto mt-20">
      <div className="flex shadow-md my-10 2xl:59px lg:50px">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl"> Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              SubTotal
            </h3>
          </div>
          <CartItemCard userName={userName} />
        </div>

        <ProceedToCheckout />
      </div>
    </div>
  );
};

export default CartPage;
