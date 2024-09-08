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


export const userModel: Model<IUser> = mongoose.models.users ?? mongoose.model<IUser>("users", userSchema);

