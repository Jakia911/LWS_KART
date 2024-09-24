
import { wishlistModel } from "@/models/wishlist-model";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";

interface WishlistRequestBody{
  userName:string,
  productId:string,
   name:string,
  price: number;
  image: string;
}
export const POST = async(request:Request):Promise<NextResponse> => {
  
  const { productId, name, price, image,userName }: WishlistRequestBody = await request.json();
  await dbConnect();
  
  const newWishlist = {
     userName: userName,
    productId: productId,
    name:name,
    price: price,
    image:image
  }

  console.log("new wishlist data is",newWishlist);

  try {
    await wishlistModel.create(newWishlist)
     return new NextResponse('Wishlist has been added', {
      status:201
    })
  }
  catch (err:any) {
     return new NextResponse(err.message, {
      status:500
    })
  }


}