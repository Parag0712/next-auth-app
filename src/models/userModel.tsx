import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username Already exists"],
        required: [true, "Username is required"],
    },
    email:{
        type:String,
        required: [true, "Email is required"],
        unique:[true,"Email Already exists"],
    },
    password:{
        type:String,
        required: [true, "Password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User;