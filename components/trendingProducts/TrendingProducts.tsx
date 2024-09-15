import { getAllProducts } from "../../database/queries/index";

import TrendingProductCard from "./TrendingProductCard";

const TrendingProducts = async () => {
  const products = await getAllProducts();

  const trendingProducts = products.slice(0, 6);
  console.log(products);

  // Define the expected structure of the request body

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        TRENDING PRODUCTS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trendingProducts.map((prod) => (
          <TrendingProductCard prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
