
import { cartModel } from "@/models/cart-model";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";

interface CartRequestBody{
  userName:string,
  productId:string,
   name:string,
  price: number;
  image: string;
}
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

    const existingProduct = await (cartModel.findOne({ userName: userName, productId: productId }))
    if (existingProduct) {
      return new NextResponse('Product already exists in the',{status:401}) 
    }

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