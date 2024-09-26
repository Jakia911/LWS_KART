import { ObjectId } from "mongoose";

// /types/product.ts
export interface Product {
  id?: string;
  title: string;
  price?: number;
  description: string;
  category: string;
  image?: string;
  trending?: boolean;
  topArrival?: boolean;
}

export interface IProduct {
  _id: ObjectId;
  name: string;
  price: number;
  description: string;
    category: string;
    image?: string;
    trending?: boolean;
    topArrival?: boolean;
 
}