"use client";

import { Product } from "@/types/product";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TrendingProductCard from "./TrendingProductCard";

const TrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();

  const userName: string | undefined | null = session?.user?.name;
  const fetchProducts = () => {
    setLoading(true);

    fetch("/api/products/trending")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // Fetch sorted products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        TRENDING PRODUCTS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((prod) => (
          <TrendingProductCard prod={prod} userName={userName} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
