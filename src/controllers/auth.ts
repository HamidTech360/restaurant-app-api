import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/user";
import { SendMail } from "../utils/mail";
import { generateAccessToken } from "../utils/token";

//@ts-ignore

export const login = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const {email, password} = req.body
            // const admin = await User.findOne({email})
            // if(!admin){
            //      res.status(400).json({
            //         message: `admin with email ${email} does not exist`,
            //         key: "email",
            //       });
            //       return
            // }else if (!(await admin.matchPassword(password))) {
            //      res
            //       .status(400)
            //       .json({ message: "Password is incorrect", key: "password" });
            //       return
            // }else if(!admin.isVerified){
            //     res
            //       .status(400)
            //       .json({ message: "You don't have access to this portal yet", key: "verify" });
            //       return
            // }


            // const accessToken = generateAccessToken({sub:admin._id})
            res.json({
                message:'Authentication successful',
                // accessToken
            })


        }catch(error){
            res.status(500).send('Server Error')
        }
    }
)

