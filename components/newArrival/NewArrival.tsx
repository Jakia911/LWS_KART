"use client";
import { Product } from "@/types/product";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewArrival = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const { data: status, session } = useSession();
  const userName = session?.user?.name;

  useEffect(() => {
    fetch("/api/products/topArrival")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch new arrivals");
        return response.json();
      })
      .then((data) => {
        const transformedData = data.map((item) => ({
          ...item,
          id: item._id, // Assign _id to id
          _id: undefined,
        }));
        setNewArrivals(transformedData);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToWishlist = (prod: wishlistItem) => {
    console.log(prod);
    console.log("clicked");

    const product = {
      userName: userName,
      productId: prod?.id,
      image: prod?.image,
      name: prod?.title,
      price: prod?.price,
      wQuantity: 1,
    };
    console.log(product);

    if (!userName) {
      const redirectPath = window.location.pathname; // use window.location for the current path
      router.push(`/login?redirect=${redirectPath}`);
    } else {
      addToWishlist(product);
    }

    //increase popularity
    const productId = prod?.id;
    try {
      const res = fetch(`/api/products/trending`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res) {
        throw new Error("Product failed to update");
      }
    } catch (err: any) {
      console.log("", err.message);
    }
  };

  const handleAddToCart = (prod: CartItem) => {
    const product: CartItem = {
      userName: userName,
      productId: prod?.id,
      image: prod?.image,
      name: prod?.title,
      price: prod?.price,
      quantity: 1,
    };
    console.log(product);
    if (!userName) {
      const redirectPath = window.location.pathname; // use window.location for the current path
      router.push(`/login?redirect=${redirectPath}`);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        top new arrival
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {newArrivals.map((prod) => (
          <div
            className="bg-white shadow rounded overflow-hidden group"
            id={prod.id || ""}
          >
            <div className="relative">
              <Image
                src={prod.image ? prod.image : prod1}
                alt={prod.title || "product"}
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
              <div className="flex justify-between items-center">
                <Link href={`/productDetails/${prod?.id}`}>
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    {prod.title}
                  </h4>
                </Link>
                <button onClick={() => handleAddToWishlist(prod)}>
                  <svg
                    stroke="#FD3D57"
                    fill="#FD3D57"
                    stroke-width="0"
                    version="1.1"
                    viewBox="0 0 16 16"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.8 1c-1.682 0-3.129 1.368-3.799 2.797-0.671-1.429-2.118-2.797-3.8-2.797-2.318 0-4.2 1.882-4.2 4.2 0 4.716 4.758 5.953 8 10.616 3.065-4.634 8-6.050 8-10.616 0-2.319-1.882-4.2-4.2-4.2z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">
                  ${prod.price || 0}
                </p>
                <p className="text-sm text-gray-400 line-through">$55.90</p>
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
            <button
              onClick={() => handleAddToCart(prod)}
              className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
