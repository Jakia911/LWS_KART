
import { cartModel } from "@/models/cart-model";
import { dbConnect } from "@/services/mongo";
import { CartRequestBody } from "@/types/cart";
import { NextResponse } from "next/server";



// for post data
export const POST = async(request:Request):Promise<NextResponse> => {
  
  const { productId, name, price, image,userName }: CartRequestBody = await request.json();
  await dbConnect();
  
  const newCart = {
     userName: userName,
    productId: productId,
    name:name,
    price: price,
    image:image
  }

  console.log("new cart data is",newCart);

  try {

    // const existingProduct = await (cartModel.findOne({ userName: userName, productId: productId }))
    // if (existingProduct) {
    //   return new NextResponse('Product already exists in the cart',{status:401}) 
    // }

    await cartModel.create(newCart)
     return new NextResponse('cart has been added', {
      status:201
    })
  }
  catch (err:any) {
     return new NextResponse(err.message, {
      status:500
    })
  }


}


// for updating data






// export const PUT = async (request: Request): Promise<NextResponse> => {
//   const { productId, quantity, userName }: UpdateCartQuantityRequest = await request.json();

//   await dbConnect();

//  try {
   
//     const existingCart = await cartModel.findOne({ userName }).lean<ICart>(); 
//     console.log('Existing Cart:', existingCart);

//     // If no cart is found, return a 404 response
//     if (!existingCart) {
//       return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
//     }

//     // Find the product in the cart by productId
//     // const productIndex = existingCart.items.findIndex((item) => item.productId === productId);

//     // if (productIndex === -1) {
//     //   return NextResponse.json({ message: 'Product not found in cart' }, { status: 404 });
//     // }

//     // Update the quantity of the product
//     // existingCart.items[productIndex].quantity = quantity;

 
//     await cartModel.updateOne(
//       { userName, 'items.productId': productId },  // Find the specific cart and product
//       { $set: { 'items.$.quantity': quantity } }   // Use the positional operator $ to update the correct product
//     );

    
//     return NextResponse.json({ message: 'Product quantity updated successfully' }, { status: 200 });

//   } catch (error: any) {
    
//     console.error('Error updating cart:', error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
  
// };



