"use client";

import { Product } from "@/types/product";
import { useEffect, useState } from "react";

interface allProductProp {
  products: Product[];
}

const CategoryFilter: React.FC<allProductProp> = ({ products }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Initialize state with an empty array

  useEffect(() => {
    const getUniqueCategories = () => {
      const allCategories = allProducts.map((prod) => prod.category);
      const uniqCategories = allCategories.filter(
        (category, index) => allCategories.indexOf(category) === index
      );
      setCategories(uniqCategories);
    };

    getUniqueCategories();
  }, [allProducts]);
  console.log(categories);

  const handleCategoryChange = (category: string) => {
    const updatedSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedSelectedCategories);

    // Filter products based on selected categories
    if (updatedSelectedCategories.length === 0) {
      // If no categories selected, show all products
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        updatedSelectedCategories.includes(product.category)
      );
      setFilteredProducts(filtered);
    }
  };

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
