import { authOptions } from "@/auth";
import CartItemCard from "@/components/cart/CartItemCard";
import CartItemsHeader from "@/components/cart/CartItemsHeader";
import ProceedToCheckout from "@/components/cart/ProceedToCheckout";
import { getAllProducts } from "@/database/queries";
import { getServerSession } from "next-auth";

const CartPage = async () => {
  //fetch product data

  const allProducts = await getAllProducts();

  const session = await getServerSession(authOptions);
  const userName: string | undefined | null = session?.user?.name;

  return (
    <div className="container mx-auto mt-20">
      <div className="md:flex  my-10 2xl:59px lg:50px">
        <div className="lg:w-3/4 w-full bg-white px-10 py-10 shadow-md">
          <CartItemsHeader />
          <CartItemCard userName={userName} />
        </div>

        <ProceedToCheckout userName={userName} />
      </div>
    </div>
  );
};

export default CartPage;
