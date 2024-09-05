import ProductDescription from "@/components/ProductDetails/ProductDescription";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

const ProductDetailsPage = () => {
  return (
    <>
      <div className="container py-4 flex items-center gap-3">
        <a href="../index.html" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Product</p>
      </div>

      {/* product details page */}
      <ProductDetails />
      <ProductDescription />
    </>
  );
};

export default ProductDetailsPage;
