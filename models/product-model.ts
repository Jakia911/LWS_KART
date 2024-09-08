import mongoose, { Document, Model, Schema } from "mongoose";

interface IProduct extends Document {
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

// Create the Mongoose model for products
export const productModel: Model<IProduct> = mongoose.models.products ?? mongoose.model<IProduct>("products", productSchema);