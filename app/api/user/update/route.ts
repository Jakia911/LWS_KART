import { userModel } from "@/models/user-model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { dbConnect } from "@/services/mongo";

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    // Get the session from the request
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();

    // Connect to the database
    await dbConnect();

    // Find and update the user by their email from the session
    const updatedUser = await userModel.findOneAndUpdate(
      { email: session.user.email }, // Filter by authenticated user's email
      { $set: body }, // Update fields from the parsed request body
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
