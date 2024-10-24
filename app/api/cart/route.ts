import { cartModel } from "@/models/cart-model";
import { dbConnect } from "@/services/mongo";
import { CartRequestBody } from "@/types/cart";
import { NextResponse } from "next/server";

// POST: Add new product to cart
export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    // Parse the request body
    const { productId, name, price, image, userName,quantity }: CartRequestBody = await request.json();

    // Validate required fields
    if (!productId || !name || !price || (userName === undefined || userName === null || !quantity)) {
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
      quantity
    };

    await cartModel.create(newCart);

    return NextResponse.json({ message: 'Product has been added to the cart' }, { status: 201 });
  } catch (err: any) {
    console.error("Error adding product to cart:", err);
    return NextResponse.json({ message: 'Failed to add product to the cart', error: err.message }, { status: 500 });
  }
};


//get cart data




// GET: Fetch cart data by username
export const GET = async (request: Request): Promise<NextResponse> => {
  try {
    // Get the username from the query parameters
    const { searchParams } = new URL(request.url);
    const userName = searchParams.get('userName');
    
    // Ensure username is provided
    if (!userName) {
      return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    await dbConnect(); // Ensure DB connection

    // Find all cart items by username
    const cartItems = await cartModel.find({ userName });

    // Return the cart items
    return NextResponse.json({ cartItems }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching cart data:', error.message);
    return NextResponse.json({ message: 'Failed to fetch cart data', error: error.message }, { status: 500 });
  }
};


//increment the quantity by one



interface UpdateCartRequest {
  productId: string;
  userName: string;
}

// export const PUT = async (request: Request): Promise<NextResponse> => {
//   try {
//     // Parse the request body and type it correctly
//     const { productId, userName }: UpdateCartRequest = await request.json();

//     console.log("user data for increment quantity",productId,userName)

//     // Validate required fields
//     if (!productId || !userName) {
//       return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
//     }

//     await dbConnect(); // Ensure DB connection

//     // Find the user's cart with the specific product
//     const existingCart = await cartModel.findOne({ userName, productId });

//     if (!existingCart) {
//       return NextResponse.json({ message: 'Cart or product not found' }, { status: 404 });
//     }

//     // Increment the quantity by 1
//     const newQuantity = (existingCart.quantity || 0) + 1;
//     console.log('newquantity data is',newQuantity)

//     // Update the quantity of the specific product in the cart
//     await cartModel.updateOne(
//       { userName, productId }, // Find by username and product ID
//       { $set: { quantity: newQuantity } } // Update the quantity
//     );

//     return NextResponse.json({ message: 'Product quantity incremented successfully', newQuantity }, { status: 200 });
//   } catch (error: any) {
//     console.error('Error updating cart:', error.message);
//     return NextResponse.json({ message: 'Failed to update product quantity', error: error.message }, { status: 500 });
//   }
// };


//decrement the quantity by one
export const PUT = async (request: Request): Promise<NextResponse> => {
  try {
    // Parse the request body and type it correctly
    const { productId, userName, action }: { productId: string, userName: string, action: 'increment' | 'decrement' } = await request.json();

    console.log("user data for updating quantity", productId, userName, action);

    // Validate required fields
    if (!productId || !userName || !action) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect(); // Ensure DB connection

    // Find the user's cart with the specific product
    const existingCart = await cartModel.findOne({ userName, productId });

    if (!existingCart) {
      return NextResponse.json({ message: 'Cart or product not found' }, { status: 404 });
    }

    let newQuantity = existingCart.quantity;

    // Check action type and update the quantity accordingly
    if (action === 'increment') {
      newQuantity = (existingCart.quantity || 0) + 1;
    } else if (action === 'decrement') {
      newQuantity = (existingCart.quantity || 0) - 1;
      if (newQuantity < 0) {
        newQuantity = 0; // Prevent quantity from going below 0
      }
    }

    console.log('updated quantity:', newQuantity);

    // Update the quantity of the specific product in the cart
    await cartModel.updateOne(
      { userName, productId }, // Find by username and product ID
      { $set: { quantity: newQuantity } } // Update the quantity
    );

    return NextResponse.json({ message: 'Product quantity updated successfully', newQuantity }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating cart:', error.message);
    return NextResponse.json({ message: 'Failed to update product quantity', error: error.message }, { status: 500 });
  }
};


//remove the cart from

export const DELETE = async (request:Request):Promise<NextResponse> => {
  try {
    // Parse the request URL to get search parameters
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId'); 
    const userName = searchParams.get('userName'); 

    // Check if productId is provided
    if (!productId) {
      return NextResponse.json(
        { message: 'Product ID is required to delete a cart item' },
        { status: 400 }
      );
    }
// Connect to the database
    await dbConnect(); 

    // Find and delete the cart item based on productId and optionally userName
    const deletedCartItem = await cartModel.findOneAndDelete({
      productId,
      ...(userName && { userName }) 
    });

    if (!deletedCartItem) {
      return NextResponse.json(
        { message: 'Cart item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Cart item deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting cart item:', error);
    return NextResponse.json(
      { message: 'Failed to delete cart item', error: error.message },
      { status: 500 }
    );
  }
}




