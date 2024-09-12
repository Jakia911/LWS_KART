
import { Product } from "@/types/product";
import { replaceMongoIdInArray } from "@/utils/data-util";
import { productModel } from "../../models/product-model";



export const getAllProducts = async (): Promise<Product[]> => {
  const products = await productModel.find().lean();

  // Ensure that fetched data matches the Product interface
   return replaceMongoIdInArray(products) as Product[];
};