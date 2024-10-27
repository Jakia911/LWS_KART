import { productModel } from "@/models/product-model";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";

export const GET = async(request:Request):Promise<NextResponse> => {
    
    try {
        dbConnect();

        const trending =await productModel.find().sort({
            popularity: -1,
            
        }).limit(5).lean();

        return NextResponse.json(trending,{status:200});
        
    } catch (err:any) {
        console.log(err.messege, 'Trending product failed to fetch');
        return NextResponse.json({ messege: "Error fetching Trending" }, {status:500});
    }
}


export const PUT = async (request:Request):Promise<NextResponse> => {
    try {
        dbConnect();
        const { productId }: { productId: string } = await request.json()
        

    if (!productId) {
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 400 }
      );
    }

const updatePopularity = await  productModel.findByIdAndUpdate(
  { _id: productId }
        , {
            $inc:{popularity:1}
    });
         return  NextResponse.json({messege:"Error while updating product popularity",updatePopularity},{status:200})
    } catch(err:any) 
  
     {
        console.log(err, "Error updating product popularity")
       return  NextResponse.json({messege:"Error while updating product popularity",err:err.message},{status:500})
    }
}