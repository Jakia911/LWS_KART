import { cartModel } from "@/models/cart-model";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";

interface CartRequestBody{
  id:string,
   name:string,
  price: number;
  image: string;
}
export const POST = async(request:Request):Promise<NextResponse> => {
  
  const { id, name, price, image }: CartRequestBody = await request.json();
  await dbConnect();
  
  const newCart = {
    id: id,
    name:name,
    price: price,
    image:image
  }

  console.log(newCart);

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