// The Mongoose model for Product
import { productModel } from '@/models/product-model';
import { dbConnect } from '@/services/mongo'; // Your MongoDB connection utility
import { NextResponse } from 'next/server';

export const GET = async (request: Request): Promise<NextResponse> => {
  try {
    // Connect to the database
    await dbConnect();

    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const productId = searchParams.get('productId');

    // Validate required query parameters
    if (!category || !productId) {
      return NextResponse.json({ message: 'Missing category or productId' }, { status: 400 });
    }

    // Fetch related products by category
    const relatedProducts = await productModel.find({
      category: category,
      _id: { $ne: productId }, 
    }).limit(4); 

    // Return the related products
    return NextResponse.json(relatedProducts, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching related products:', error);
    return NextResponse.json({ message: 'Error fetching related products' }, { status: 500 });
  }
};
