import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Admin from "../models/admin";
import { generateAccessToken } from "../utils/token";

export const registerAdmin = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const {userName, email, password} = req.body
        
        try{
            const adminExist = await Admin.findOne({email:email})
            if(adminExist)  {
                res.status(401).send('An admin with this email already exist')
                return
            }
            
            const newAdmin = new Admin({
                userName,
                email,
                password
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