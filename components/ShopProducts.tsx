import { Product } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import prod1 from "../public/images/products/product1.jpg";

interface productType {
  allProducts: Product[];
}

const ShopProducts: React.FC<productType> = ({ allProducts }) => {
  const [products, setProducts] = useState<Product[]>(allProducts); // Initialize with allProducts
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Extract search query from router
  const { search } = router.query;

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try {
        setLoading(true);
        let data;

        // If there's a search term, fetch filtered products
        if (search) {
          const res = await fetch(`/api/products?search=${search}`);
          data = await res.json();
        }

        // If search results are found, update state; otherwise, fallback to allProducts
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(allProducts);
        }
      } catch (err: any) {
        console.log("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch either the search results or show the default products
    fetchSearchedProducts();
  }, [search, allProducts]); // Rerun effect when search query or allProducts change

  return (
    <div className="col-span-3">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length ? (
          products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white shadow rounded overflow-hidden group"
            >
              <div className="relative">
                <Image
                  src={prod.image ? prod.image : prod1} // Use dynamic image URL from the product
                  alt={prod.title}
                  className="w-full"
                  width={500}
                  height={500}
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                      justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="view product"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </a>
                  <a
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="add to wishlist"
                  >
                    <i className="fa-solid fa-heart"></i>
                  </a>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <a href="#">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    {prod.title} {/* Use product name */}
                  </h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">
                    ${prod.price}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {prod.price}
                  </p>{" "}
                  {/* Example of original price */}
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1 text-sm text-yellow-400">
                    <span>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span>
                      <i className="fa-solid fa-star"></i>
                    </span>
                    <span>
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
              </div>
              <a
                href="#"
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
              >
                Add to cart
              </a>
            </div>
          ))
        ) : (
          <p>No products found.</p> // Handle the case when no products are available
        )}
      </div>
    </div>
  );
};

export default ShopProducts;
