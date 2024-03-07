import { connect } from "@/dbConfig/dbConfig";
import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(request:NextRequest){
    try {
        const userId = await verifyToken(request);
        const user = User.findOne({_id: userId}).select("-password");
        
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        },
        )
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}