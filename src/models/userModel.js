import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
        username : {
            type : "String",
            required : [true,"please provide username"],
            unique:true,
        },
        email: {
            type: "String",
            required :[true,"please provide your email"],
            unique:true,
        },
        password:{
            type:"String",
            required:[true,"please provide password"],
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        forgotpPasswordToken : String,
        forgotPasswordTokenExpiry : Date,
        verifyToken :String,
        verifyTokenExpiry :Date,


})

const User = mongoose.model.users || mongoose.model ("User",userSchema);

export default User;