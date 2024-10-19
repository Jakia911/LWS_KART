import { productModel } from "@/models/product-model";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";







// GET: Fetch products based on the search query
export const GET = async (request: Request): Promise<NextResponse> => {
  try {
    // Connect to the database
    await dbConnect();
    
    // Extract the search query from the request URL
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    // Validate if the search query exists
    if (!search) {
      return NextResponse.json({ message: 'Search query is required' }, { status: 400 });
    }

    // Find products by title matching the search query (case-insensitive)
    const products = await productModel.find({
      title: { $regex: search, $options: "i" }, // Perform a case-insensitive search
    });

    // Return the matched products
    return NextResponse.json(products, { status: 200 });

  } catch (err: any) {
    console.error('Error finding the searched product:', err);
    // Return error response with status 500
    return NextResponse.json({ message: 'Error finding the searched product' }, { status: 500 });
  }
};
