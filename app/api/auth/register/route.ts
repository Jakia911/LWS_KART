import { userModel } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Define the structure of the request body
interface UserRequestBody {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export const POST = async (request: Request): Promise<NextResponse> => {
  const { fname, lname, email, password }: UserRequestBody = await request.json();

  console.log(fname, lname, email, password);

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name: `${fname} ${lname}`,
    email,
    password: hashedPassword,
  };

  console.log(newUser);

  try {
    await userModel.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};