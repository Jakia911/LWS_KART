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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
