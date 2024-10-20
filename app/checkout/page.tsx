import { authOptions } from "@/auth";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import PlaceorderForm from "@/components/checkout/PlaceorderForm";
import { getServerSession } from "next-auth";

const CheckOutPage = async () => {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name;

  return (
    <div>
      {/* breadcrumb section */}
      <div className="container py-4 flex items-center gap-3">
        <a href="../index.html" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Checkout</p>
      </div>
      <div className="w-full max-w-[80%] mx-auto">
        <div className="lg:flex items-center justify-center">
          <div className="lg:w-[48%] w-full">
            <CheckoutForm userName={userName} />
          </div>
          <div className="lg:w-[48%] w-full">
            <PlaceorderForm userName={userName} />
          </div>

          {/* place order form */}
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
