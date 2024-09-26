
import { IProduct, Product } from "@/types/product";
import { replaceMongoIdInArray } from "@/utils/data-util";

import { ObjectId } from 'mongodb';

import { productModel } from "../../models/product-model";


import { cartModel, ICart } from "@/models/cart-model";


export const getAllProducts = async (): Promise<Product[]> => {
  const products = await productModel.find().lean();

 
   return replaceMongoIdInArray(products) as Product[];
};




// get product by id







export const replaceMongoIdInObject = <T extends { _id: ObjectId }>(obj: T): Omit<T, '_id'> & { id: string } => {
    const { _id, ...updatedObj } = obj;
    return { ...updatedObj, id: _id.toString() };
};


export const getProductById = async (productId: string): Promise<Omit<IProduct, '_id'> & { id: string } | null> => {
    const product = await productModel.findById(productId).lean<Omit<IProduct, '_id'> & { _id: ObjectId }>();

    // If product is null, return null
    if (!product) {
        return null;
    }

    return replaceMongoIdInObject(product);
};



 // Import Cart interface

export const getCartForUser = async (userId: ObjectId): Promise<ICart | null> => {
  try {
    const cart = await cartModel.findOne().populate("items.productId");
    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};



// add product to the cart
export const addToCart = () => {
  
}

