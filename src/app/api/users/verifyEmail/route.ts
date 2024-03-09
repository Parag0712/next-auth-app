import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody =await request.json();
        const {token} = reqBody;
        console.log(reqBody);

        //find user base on token if found 
        const user =await User.findOne({verifyToken:token,verifyTokenExpiry: {$gt: Date.now()}});

        // if not found then throw error
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400});
        }

        // now unset all token
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        //send response
        return NextResponse.json({
            message:"Email verified successfully",
            success:true
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}