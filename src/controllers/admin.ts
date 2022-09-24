import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Admin from "../models/admin";

export const getAllAdmins = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const admins = await Admin.find()
            res.json({
                message:'All admin fetched',
                admins
            })
        }catch(error){
            res.status(500).send('Server Error')
        }
    }
)

export const verifyAdmin = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const {admin} = req.body
        console.log(admin)
        try{
            const admin__c = await Admin.findByIdAndUpdate(
                admin, 
                {isVerified:true},
                {new:true}
            )
            res.json({
                message:'All Verified',
                admin__c
            })
        }catch(error){
            res.status(500).send('Server Error')
        }
    }
)