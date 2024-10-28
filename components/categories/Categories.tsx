"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import prod1 from "../../public/images/products/product1.jpg";

// interface categoriesProps {
//   products: Product[];
// }
const Categories = ({}) => {
  const [categories, setCategories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setLoading(true);

    fetch("/api/getAllProducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        const transformedData = data.map((item: any) => ({
          ...item,
          id: item._id, // Assign _id to id
          _id: undefined,
        }));
        setProducts(transformedData);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (products.length) {
      const seenCategories = new Set();
      const uniqCategories = products.filter((product) => {
        if (seenCategories.has(product.category)) {
          return false;
        } else {
          seenCategories.add(product.category);
          return true;
        }
      });
      setCategories(uniqCategories);
    }
  }, [products]);
  console.log(products, categories);
  return (
    <div className="container py-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        shop by category
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((prod) => (
          <div
            className="relative rounded-sm overflow-hidden group"
            key={prod.id}
          >
            <Image
              src={prod.image ? prod.image : prod1}
              alt="category 1"
              className="w-full"
              width={400}
              height={400}
            />
            <a
              href="#"
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
            >
              {prod.category}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
