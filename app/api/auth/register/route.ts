import { userModel } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Define the structure of the request body
interface UserRequestBody {
  name: string;
  email: string;
  password: string;
}

export const POST = async (request: Request): Promise<NextResponse> => {
  const { name, email, password }: UserRequestBody = await request.json();

  console.log(name, email, password);

  await dbConnect();

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    NextResponse.json({ message: "Internal server error" });
  }
};
