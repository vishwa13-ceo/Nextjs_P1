import {connect} from "@/dbConfig/dbConfig";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        console.log(reqBody)

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }


        //hashpassword
        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password,salt)


        const newUser = new User({
            username,
            email,
            password:hashedpassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);


        return NextResponse.json({
            message:"user created successfully",
            success: true,
            savedUser
        })

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}