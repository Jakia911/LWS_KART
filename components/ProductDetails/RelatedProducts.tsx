"use client";

import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import RelatedProductCard from "./RelatedProductCard";

interface RelatedProductsProps {
  category: string | undefined;
  productId: string | undefined;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  category,
  productId,
}) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          `/api/relatedProducts?category=${category}&productId=${productId}`
        );
        const data = await response.json();

        if (response.ok) {
          setRelatedProducts(data);
        } else {
          console.log("Error fetching related products", data.message);
        }
      } catch (err) {
        console.log("Error fetching related products", err);
      }
    };

    fetchRelatedProducts();
  }, [category, productId]); // Add dependencies here to trigger on category/productId change

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((prod) => (
          <RelatedProductCard
            key={prod.id} // Always use a unique key for list items
            prod={prod}
            category={category}
            productId={productId}
          />
        ))}
      </div>
    </>
  );
};

export default RelatedProducts;
