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