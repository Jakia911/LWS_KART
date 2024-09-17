"use client";
import { Product } from "@/types/product";
import Image from "next/image";
import React from "react";
import prod1 from "../../public/images/products/product1.jpg"; // Ensure this path is correct

interface ProductCardProps {
  prod: Product;
}

const TrendingProductCard: React.FC<ProductCardProps> = async ({ prod }) => {
  // const router = useRouter();

  //get the user
  // const session = await auth();
  // console.log(session);

  const handleAddToCart = async () => {
    const cartData = {
      productId: prod?.id,
      name: prod?.title,
      price: prod?.price,
      image: prod?.image,
    };

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      if (res.status === 201) {
        // router.push("/cartDetailsPage");
      } else {
        const data = await res.json();
        console.log(data);
        throw new Error(data.message || "Card adding failed");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
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
        <a href="#">
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {prod.title}
          </h4>
        </a>
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
        onClick={handleAddToCart}
        className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
      >
        Add to cart
      </button>
    </div>
  );
};

export default TrendingProductCard;
