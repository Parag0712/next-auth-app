import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        //find user base on token if found 
        console.log(reqBody);
        
        const user = await User.findOne({email:email});

        // if not found then throw error
        if(!user){
            return NextResponse.json({error:"Invalid Email"},{status:400});
        }
        
        await sendEmail({email,emailType:"RESET",userId:user._id});

        //send response
        return NextResponse.json({
            message:"Password reset link sended",
            success:true
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}