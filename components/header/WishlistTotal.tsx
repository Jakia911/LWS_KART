"use client";

import { useWishlistQuantity } from "@/hooks/useWishlistQuantity";

interface userType {
  userName: string | null | undefined;
}
const WishlistTotal: React.FC<userType> = ({ userName }) => {
  const totalWquantity = useWishlistQuantity(userName);
  return (
    <>
      <div className="text-2xl">
        <i className="fa-regular fa-heart"></i>
      </div>
      <div className="text-xs leading-3">Wishlist</div>
      <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
        {totalWquantity}
      </div>
    </>
  );
};

export default WishlistTotal;
