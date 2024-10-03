import mongoose, { Model, Schema } from "mongoose";

// Define the Cart interface
export interface ICart {
  userName: string | null | undefined; 
  productId: mongoose.Schema.Types.ObjectId; // Use ObjectId if you're storing references to other collections
  name: string;
  price: number;
  image: string;
}

// Create the schema
const cartSchema = new Schema<ICart>({
  userName: {
    type: String,
    // If you want it required, but it allows null, handle it in logic elsewhere
  },
  productId: { type: mongoose.Schema.Types.ObjectId,  }, // ObjectId type for references
  name: { type: String,  },
  price: { type: Number,  },
  image: { type: String,  },
});

// Get or create the Cart model
const getCartModel = (): Model<ICart> => {
  if (mongoose.models.Cart) {
    return mongoose.model<ICart>("Cart");
  } else {
    return mongoose.model<ICart>("Cart", cartSchema);
  }
};

// Export the model using the function
export const cartModel: Model<ICart> = getCartModel();
