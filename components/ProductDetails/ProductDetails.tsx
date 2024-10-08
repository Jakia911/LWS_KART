"use client";

import { IProduct } from "@/types/product";
import Image from "next/image";
import { FC } from "react";
import product1 from "../../public/images/products/product1.jpg";
import product2 from "../../public/images/products/product2.jpg";
import product3 from "../../public/images/products/product3.jpg";
import product4 from "../../public/images/products/product4.jpg";
import product5 from "../../public/images/products/product5.jpg";
import product6 from "../../public/images/products/product6.jpg";

interface ProductDetailsProps {
  product:
    | (Omit<IProduct, "_id"> & {
        id: string;
      })
    | null;
  userName?: string | null | undefined;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product, userName }) => {
  // handle add to cart
  const handleAddToCart = async () => {
    const wishlistData = {
      userName: userName,
      productId: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
    };
    console.log(wishlistData);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistData),
      });

      if (res.status === 201) {
        // router.push("/cartDetailsPage");
      } else {
        const data = await res.json();
        console.log("card data is", data);
        throw new Error(data.message || "Card adding failed");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  //handle increment cart quantity

  // interface UpdateCart {
  //   userName: string | null | undefined;
  //   productId: string | undefined;
  // }

  interface UpdateCartResponse {
    newQuantity: number;
    message?: string;
  }

  const handleIncrement = async () => {
    const updateCart = {
      userName: userName,
      productId: product?.id,
      action: "increment",
    };
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCart),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to increment quantity");
      }

      // Update the UI with the new quantity
      console.log("Product quantity incremented:", data.newQuantity);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const handleDecrement = async () => {
    const updateCart = {
      userName: userName,
      productId: product?.id,
      action: "decrement",
    };
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCart),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to increment quantity");
      }

      // Update the UI with the new quantity
      console.log("Product quantity incremented:", data.newQuantity);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };
  // handle add to wishlist
  const handleAddToWishlist = async () => {
    const wishlistData = {
      productId: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
    };
    console.log(wishlistData);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistData),
      });

      if (res.status === 201) {
        // router.push("/cartDetailsPage");
      } else {
        const data = await res.json();
        console.log("Wishlist data is", data);
        throw new Error(data.message || "Wishlist adding failed");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="container grid grid-cols-2 gap-6">
      <div>
        <Image
          src={product?.image ? product?.image : product1}
          alt="product"
          className="w-full"
          width={500}
          height={500}
        />
        <div className="grid grid-cols-5 gap-4 mt-4">
          <Image
            src={product2}
            alt="product2"
            width={500}
            height={500}
            className="w-full cursor-pointer border border-primary"
          />
          <Image
            src={product3}
            width={500}
            height={500}
            alt="product2"
            className="w-full cursor-pointer border"
          />
          <Image
            src={product4}
            width={500}
            height={500}
            alt="product2"
            className="w-full cursor-pointer border"
          />
          <Image
            src={product5}
            width={500}
            height={500}
            alt="product2"
            className="w-full cursor-pointer border"
          />
          <Image
            src={product6}
            width={500}
            height={500}
            alt="product2"
            className="w-full cursor-pointer border"
          />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-medium uppercase mb-2">{product?.name}</h2>
        <div className="flex items-center mb-4">
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
          <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
        </div>
        <div className="space-y-2">
          <p className="text-gray-800 font-semibold space-x-2">
            <span>Availability: </span>
            <span className="text-green-600">In Stock</span>
          </p>
          <p className="space-x-2">
            <span className="text-gray-800 font-semibold">Brand: </span>
            <span className="text-gray-600">Apex</span>
          </p>
          <p className="space-x-2">
            <span className="text-gray-800 font-semibold">Category: </span>
            <span className="text-gray-600"> {product?.category}</span>
          </p>
          <p className="space-x-2">
            <span className="text-gray-800 font-semibold">SKU: </span>
            <span className="text-gray-600">BE45VGRT</span>
          </p>
        </div>
        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
          <p className="text-xl text-primary font-semibold">
            {" "}
            {product?.price}
          </p>
          <p className="text-base text-gray-400 line-through">$55.00</p>
        </div>

        <p className="mt-4 text-gray-600">{product?.description}</p>

        <div className="mt-4">
          <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
          <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
            <div
              onClick={handleDecrement}
              className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
            >
              -
            </div>
            <div className="h-8 w-8 text-base flex items-center justify-center">
              4
            </div>
            <div
              onClick={handleIncrement}
              className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
            >
              +
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
          <button
            onClick={handleAddToCart}
            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
          >
            <i className="fa-solid fa-bag-shopping"></i> Add to cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
          >
            <i className="fa-solid fa-heart"></i> Wishlist
          </button>
        </div>

        <div className="flex gap-3 mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
