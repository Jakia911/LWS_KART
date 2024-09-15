import { cartModel } from "@/models/cart-model";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";

interface CartRequestBody{
  productId:string,
   name:string,
  price: number;
  image: string;
}
export const POST = async(request:Request):Promise<NextResponse> => {
  
  const { productId, name, price, image }: CartRequestBody = await request.json();
  await dbConnect();
  
  const newCart = {
    productId: productId,
    name:name,
    price: price,
    image:image
  }

  console.log("new cart data is",newCart);

  try {
    await cartModel.create(newCart)
     return new NextResponse('cart has been create', {
      status:201
    })
  }
  catch (err:any) {
     return new NextResponse(err.message, {
      status:500
    })
  }


}