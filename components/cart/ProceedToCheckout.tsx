import Link from "next/link";

const ProceedToCheckout = () => {
  return (
    <div
      id="summary"
      className=" lg:w-1/4 w-full px-8 py-10 border border-[#ddd] rounded-md shadow-md"
    >
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div className="flex justify-between  mb-5 border-b mt-[23px] pb-[23px]">
        <span className="font-semibold text-sm uppercase">SubTotal</span>
        <span className="font-semibold text-sm">$120</span>
      </div>
      <div className="flex justify-between  mb-5 border-b mt-[23px] pb-[23px]">
        <span className="font-semibold text-sm uppercase">Shipping</span>
        <span className="font-semibold text-sm">$120</span>
      </div>
      <div className="flex justify-between  mb-5 border-b mt-[23px] pb-[23px]">
        <span className="font-semibold text-sm uppercase">Total</span>
        <span className="font-semibold text-sm">$1120</span>
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
