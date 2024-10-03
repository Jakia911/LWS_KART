import { cartModel } from "@/models/cart-model";
import { dbConnect } from "@/services/mongo";
import { CartRequestBody } from "@/types/cart";
import { NextResponse } from "next/server";

// POST: Add new product to cart
export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    // Parse the request body
    const { productId, name, price, image, userName }: CartRequestBody = await request.json();

    // Validate required fields
    if (!productId || !name || !price || (userName === undefined || userName === null)) {
  return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
}

    

    // Ensure DB connection
    await dbConnect();

    // Check if the product already exists in the user's cart
    const existingProduct = await cartModel.findOne({ userName, productId });
    if (existingProduct) {
      return NextResponse.json({ message: 'Product already exists in the cart' }, { status: 400 });
    }

    // Create a new cart entry
    const newCart = {
      userName,
      productId,
      name,
      price,
      image,
    };

    await cartModel.create(newCart);

    return NextResponse.json({ message: 'Product has been added to the cart' }, { status: 201 });
  } catch (err: any) {
    console.error("Error adding product to cart:", err);
    return NextResponse.json({ message: 'Failed to add product to the cart', error: err.message }, { status: 500 });
  }
};
