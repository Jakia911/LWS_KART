import { productModel } from "@/models/product-model";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";

export const GET = async(request:Request):Promise<NextResponse> => {
    
    try {
        dbConnect();

        const topArrival =await productModel.find().sort({
            createdAt: -1,
            
        }).limit(5).lean();

        return NextResponse.json(topArrival,{status:200});
        
    } catch (err:any) {
        console.log(err.messege, 'top arrival product failed to fetch');
        return NextResponse.json({ messege: "Error fetching new arrival" }, {status:500});
    }
}