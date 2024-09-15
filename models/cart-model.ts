import { CartItem } from "@/types/cart";
import mongoose, { Document, Schema } from "mongoose";

// Define the item structure in the cart


// Define the Cart interface
export interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: CartItem[];
}



// Create the schema
const cartSchema: Schema<ICart> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: Number, required: true },
    },
  ],
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
