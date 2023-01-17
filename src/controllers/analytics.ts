import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Student } from "../models/students";

export const getAnalytics = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const totalStudents = await Student.countDocuments()
            

        }catch(error){
            res.status(500).send({
                message:'Server Error',
                error
            }) 
        }
    }
)