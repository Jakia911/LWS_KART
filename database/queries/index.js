
import { productModel } from "../../models/product-model";

export async function getAllProducts() {
    const products = await productModel.find().lean();

    return products;
}