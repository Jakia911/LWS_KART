import { NextResponse } from 'next/server';

import { productModel } from '@/models/product-model';
import { dbConnect } from '@/services/mongo';


export async function GET() {
  try {
    // Ensure the database is connected before querying
    await dbConnect();

    // Fetch all products from the MongoDB collection
    const products = await productModel.find().lean();
    
    // Return the products in the response
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    
    // Return an error response if something goes wrong
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}
