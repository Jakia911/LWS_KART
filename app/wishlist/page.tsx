import Wishlist from "@/components/Wishlist";

const WishListPage = () => {
  return (
    <>
      <div className="container py-4 flex items-center gap-3">
        <a href="../index.html" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Profile</p>
      </div>

      <div className="container gap-6 pt-4 pb-16">
        {/* wishlist section */}
        <Wishlist />
      </div>
    </>
  );
};

export default WishListPage;
