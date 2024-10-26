import mongoose, { Model, Schema } from "mongoose";

interface IProduct {
    title: string;
    price?: number;
    description: string;
    category: string;
    image?: string;
    createdAt: Date;
  popularity:number,
    
  
}
const productSchema = new Schema<IProduct>({
  title: { required: true, type: String },
  price: { required: false, type: Number },
  description: { required: true, type: String },
  category: { required: true, type: String },
  image: { required: false, type: String },
  createdAt: { type: Date, default: Date.now },
  popularity: { type: Number, default: 0 },
 
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
