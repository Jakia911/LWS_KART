
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





export const getCartForUser = async (userId: ObjectId): Promise<ICart | null> => {
  try {
    const cart = await cartModel.findOne().populate("items.productId");
    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};


// fetch  Cart by username
 
// Fetch cart data for a user

 interface username {
 userName?: string | null | undefined;
 
}  

interface CartDataResponse {
  cartItems: any[]; // Define the item structure if known, for now assuming `any`
  message?: string;  // Optional message field for error handling
}
export const fetchCartData = async (userName:username) => {
  try {
    const response = await fetch(`/api/cart?userName=${userName}`);
    const data:CartDataResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch cart data');
    }

    console.log('Cart data:', data.cartItems);
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};

// Example usage






