
import { Product } from "@/types/product";
import { replaceMongoIdInArray } from "@/utils/data-util";
import { productModel } from "../../models/product-model";



export const getAllProducts = async (): Promise<Product[]> => {
  const products = await productModel.find().lean();

 
   return replaceMongoIdInArray(products) as Product[];
};


import { ObjectId } from "mongoose";

import { cartModel, ICart } from "@/models/cart-model";
 // Import Cart interface

export const getCartForUser = async (userId: ObjectId): Promise<ICart | null> => {
  try {
    const cart = await cartModel.findOne({ user: userId }).populate("items.productId");
    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};



// add product to the cart
export const addToCart = () => {
  
}

