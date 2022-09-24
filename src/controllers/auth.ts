import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Admin from "../models/admin";
import { SendMail } from "../utils/mail";
import { generateAccessToken } from "../utils/token";

//@ts-ignore
export const registerAdmin = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const {username, email, password, firstName, lastName} = req.body
        
        try{
            const adminExist = await Admin.findOne({email:email})
            if(adminExist)  {
                res.status(401).send('An admin with this email already exist')
                return
            }
            
            const newAdmin = new Admin({
                userName:username,
                email,
                password,
                firstName,
                lastName
            })
            await newAdmin.save()
            
            res.json({
                message:'New admin created'
            })
        }catch(error){
            res.status(500).send({message:'Server error', error})
        }
    }
)

export const login = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const {email, password} = req.body
            const admin = await Admin.findOne({email})
            if(!admin){
                 res.status(400).json({
                    message: `admin with email ${email} does not exist`,
                    key: "email",
                  });
                  return
            }else if (!(await admin.matchPassword(password))) {
                 res
                  .status(400)
                  .json({ message: "Password is incorrect", key: "password" });
                  return
            }else if(!admin.isVerified){
                res
                  .status(400)
                  .json({ message: "You don't have access to this portal yet", key: "verify" });
                  return
            }


            const accessToken = generateAccessToken({sub:admin._id})
            res.json({
                message:'Authentication successful',
                accessToken
            })


        }catch(error){
            res.status(500).send('Server Error')
        }
    }
)

export const getAdmin = expressAsyncHandler(
    async (req:any, res:Response)=>{
        console.log(req.user?._id)
        try{
            const admin = await Admin.findById(req.user?._id)
            res.json({
                message:'Admin fetched',
                admin
            })
        }catch(error){
            res.status(500).send('Server Error')
        }
    }
)