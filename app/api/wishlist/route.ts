
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
       const existingProduct = await (wishlistModel.findOne({ userName: userName, productId: productId }))
    if (existingProduct) {
      return new NextResponse('Product already exists in the wishlist',{status:401}) 
    }
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


//get the total of wishlist quantity

export const GET = async (request:Request) => {
  
  try {
    //get the url from the search params
  const { searchParams } = new URL(request.url);
  
  const userName = searchParams.get('userName');


  if (!userName) {
    NextResponse.json({messege:"Username is required"},{status:400})
  }

    //db connection
      await dbConnect();


//return the wishlist items
    const wishlistItems = wishlistModel.find({ userName });
    
    return NextResponse.json({wishlistItems},{status:200})
  } catch (err:any) {
    console.log("error fetching wishlist data",);
    return NextResponse.json({messege:"failed to add to wishlist",err:err.messege},{status:500})
  }
}