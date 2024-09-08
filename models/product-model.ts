import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
      required: true,
      type: String
    },
     price: {
      required: false,
      type: Number
    },
    description: {
      required: true,
      type: String
    },
    category: {
      required: true,
      type: String
    },
    image: {
      required: false,
      type: String
    },
    trending: {
      required: false,
      type: Boolean
    },
     topArrival: {
      required: false,
      type: Boolean
    },
    rating: {
      required: false,
      type: Object
    },
    
  });

  export const productModel = mongoose.models.products ?? mongoose.model("products", productSchema);