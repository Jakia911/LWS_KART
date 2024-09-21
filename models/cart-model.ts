
import mongoose, { Model, Schema } from "mongoose";

// Define the item structure in the cart


// Define the Cart interface
export interface ICart {
   userName:string | null | undefined; 
  productId: mongoose.Schema.Types.ObjectId;
 name:string,
  price: number;
  image:string
}



// Create the schema
const cartSchema = new Schema<ICart>({
   userName: {
    type: String,
    default: null  // Allows `null` explicitly
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




const getCartModel = (): Model<ICart> => {
  // Check if the 'cart' model exists, use it directly if it does
  if (mongoose.models.carts) {
    return mongoose.model<ICart>('carts');
  } else {
    // If it doesn't exist, register the new model
    return mongoose.model<ICart>('carts', cartSchema);
  }
}

// Export the model using the function
export const cartModel: Model<ICart> = getCartModel();


