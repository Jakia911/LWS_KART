import { useEffect } from "react";

interface CartItemCardProps {
  userName: string | undefined | null;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ userName }) => {
  useEffect(() => {
    const res = fetch(`api/cart/`);
  });
  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="w-2/5 flex">
        <div className="w-20">
          <img className="h-24" src="/path/to/image" />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">Title</span>
          <span className="text-red-500 text-xs">Remove</span>
        </div>
      </div>
      <div className="w-1/5">
        <input type="number" className="w-16 text-center" />
      </div>
      <div className="w-1/5 text-center">
        <span className="text-sm">$50</span>
      </div>
      <div className="w-1/5 text-center">
        <span className="text-sm"></span>
      </div>
    </div>
  );
};

export default CartItemCard;
