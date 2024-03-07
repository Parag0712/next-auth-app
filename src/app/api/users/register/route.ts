import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";


connect();
export async function POST(request:NextResponse){
    try {
        
        const {email,username,password} = await request.json();
        
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashPassword
        })

        const savedUser = await newUser.save();

        const tokenData = {
            id:savedUser._id,
            email:savedUser.email,
            username:savedUser.email,
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        const response = NextResponse.json({
            message: "User created successfully",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true, 
        })

        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}