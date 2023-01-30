import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Staff } from "../models/staff";

export const createStaffRecord = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const {firstName, lastName, email, address, role, phoneNumber} = req.body
        try{
            const newStaff = await Staff.create({
                firstName,
                lastName,
                email,
                address,
                role,
                phoneNumber
            })

            res.json({
                message:'Staff record saved!',
                newStaff
            })

        }catch(error){
            res.status(500).send({
                message:'Server Error'
            })
        }
    }
)

export const getAllStaffs = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const staffs = await Staff.find()
            res.json({
                message:'Staffs record fetched',
                staffs
            })
        }catch(error){
            res.status(500).send({
                message:'Server Error'
            })
        }
    }
)