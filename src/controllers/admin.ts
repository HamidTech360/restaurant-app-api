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
        const action = req.query.action
        console.log(admin)
        try{
            const admin__c = await Admin.findByIdAndUpdate(
                admin, 
                {isVerified:action=="verify"?true:false},
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

export const editAdmin = expressAsyncHandler(
    async(req:any, res:Response)=>{
        const {firstName, lastName, userName, email} = req.body
        try{
            
            const update = await Admin.findByIdAndUpdate(req.user?._id,{
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(email && { email }),
                ...(userName && { userName })
            },{new:true})
            res.json({
                message:'Admin updated',
                update
            })
        }catch(error){
            res.status(500).send({
                message:'Server Error',
                error
            })
        }
    }
)

export const GetAdmin = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const admin = await Admin.findById(req.params.id)
            res.json({
                message:'Admin fetched',
                admin
            })
        }catch(error){
            res.status(500).send('Server Error')
        }
    }
)

