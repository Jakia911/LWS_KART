import mongoose, { Model, Schema } from "mongoose";

interface IProduct {
    title: string;
    price?: number;
    description: string;
    category: string;
    image?: string;
    trending?: boolean;
    topArrival?: boolean;
  
}
const productSchema = new Schema<IProduct>({
  title: { required: true, type: String },
  price: { required: false, type: Number },
  description: { required: true, type: String },
  category: { required: true, type: String },
  image: { required: false, type: String },
  trending: { required: false, type: Boolean },
  topArrival: { required: false, type: Boolean },
 
});
const getProductModel = (): Model<IProduct> => {
  // Check if the 'products' model exists, use it directly if it does
  if (mongoose.models.products) {
    return mongoose.model<IProduct>('products');
  } else {
    // If it doesn't exist, register the new model
    return mongoose.model<IProduct>('products', productSchema);
  }
}

// Export the model using the function
export const productModel: Model<IProduct> = getProductModel();

// export const productModel = model<IProduct>('products', productSchema);
// Create the Mongoose model for products
// export const productModel: Model<IProduct> = mongoose.models.products ?? mongoose.model<IProduct>("products", productSchema);

// const getProductModel = (): Model<IProduct> => {
//   if (mongoose.models.products) {
//     return mongoose.models.products as Model<IProduct>;
//   } else {
//     return mongoose.model<IProduct>('products', productSchema);
//   }
// }

// // Export the model using the function
// export const productModel: Model<IProduct> = getProductModel();