import { authOptions } from "@/auth";
import ProductDescription from "@/components/ProductDetails/ProductDescription";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import RelatedProducts from "@/components/ProductDetails/RelatedProducts";
import { getProductById } from "@/database/queries";
import { getServerSession } from "next-auth";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}
const ProductDetailsPage = async ({
  params: { id },
}: ProductDetailsPageProps) => {
  //fetch user session data

  const productInfo = await getProductById(id);

  const category = productInfo?.category;
  const productId = productInfo?.id;

  //user session data

  const session = await getServerSession(authOptions);
  console.log("trending product data", session?.user);
  const userName: string | null | undefined = session?.user?.name;
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
      <ProductDetails product={productInfo} userName={userName} />
      <ProductDescription product={productInfo} />

      <RelatedProducts category={category} productId={productId} />
    </>
  );
};

export default ProductDetailsPage;
