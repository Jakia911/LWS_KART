import mongoose from "mongoose";


export interface CartItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
  image:string
}