"use client";

import { Product } from "@/types/product";
import { useEffect, useState } from "react";

interface allProductProp {
  allProducts: Product[];
}

const CategoryFilter: React.FC<allProductProp> = ({ allProducts }) => {
  const [categories, setCategories] = useState<string[]>([]); // Initialize state with an empty array

  useEffect(() => {
    const getUniqueCategories = () => {
      const allCategories = allProducts.map((prod) => prod.category);
      const uniqCategories = allCategories.filter(
        (category, index) => allCategories.indexOf(category) === index
      );
      setCategories(uniqCategories);
    };

    getUniqueCategories();
  }, [allProducts]); // Dependency array should include 'allProducts', not 'categories'
  console.log(categories);
  return (
    <div>
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Categories
      </h3>
      <div className="space-y-2">
        {/* Dynamically render the categories */}
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                name={`cat-${index}`}
                id={`cat-${index}`}
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor={`cat-${index}`}
                className="text-gray-600 ml-3 cursor-pointer"
              >
                {category}
              </label>
              <div className="ml-auto text-gray-600 text-sm">(10)</div>{" "}
              {/* Dummy count */}
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
