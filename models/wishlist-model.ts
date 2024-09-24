
import mongoose, { Model, Schema } from "mongoose";

// Define the item structure in the cart


// Define the Cart interface
export interface IWishlist {
   userName:string | null | undefined; 
  productId: mongoose.Schema.Types.ObjectId;
 name:string,
  price: number;
  image:string
}



// Create the schema
const wishlistSchema = new Schema<IWishlist>({
   userName: {
    type: String,
     required: true
     // Allows `null` explicitly
  },
   productId: { type:String ,required: true},
    name:{ type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // items: [
  //   {
  //     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  //   name:{ type: String, required: true },
  //     price: { type: Number, required: true },
  //     image: { type: Number, required: true },
  //   },
  // ],
});




const getWishlistModel = (): Model<IWishlist> => {
  // Check if the 'cart' model exists, use it directly if it does
  if (mongoose.models.wishlists) {
    return mongoose.model<IWishlist>('wishlists');
  } else {
    // If it doesn't exist, register the new model
    return mongoose.model<IWishlist>('wishlists', wishlistSchema);
  }
}

// Export the model using the function
export const wishlistModel: Model<IWishlist> = getWishlistModel();


