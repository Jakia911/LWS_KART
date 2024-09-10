import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
}

const userSchema = new Schema<IUser>({
  name: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String },
  image: { required: false, type: String },
});

const getUserModel = (): Model<IUser> => {
  // Check if the 'products' model exists, use it directly if it does
  if (mongoose.models.users) {
    return mongoose.model<IUser>('users');
  } else {
    // If it doesn't exist, register the new model
    return mongoose.model<IUser>('users', userSchema);
  }
}

// Export the model using the function
export const userModel: Model<IUser> = getUserModel();

