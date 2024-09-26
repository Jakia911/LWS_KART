import ProductDescription from "@/components/ProductDetails/ProductDescription";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { getProductById } from "@/database/queries";
import { IProduct, Product } from "@/types/product";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}
const ProductDetailsPage = async ({
  params: { id },
}: ProductDetailsPageProps) => {
  const productInfo = await getProductById(id);
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
      <ProductDetails product={productInfo} />
      <ProductDescription product={productInfo} />
    </>
  );
};

export default ProductDetailsPage;
