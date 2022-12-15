import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Result } from "../models/results";

export const uploadResult = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const {scores, regNumber, studentId} = req.body
        try{
            const result = await Result.create({
                regNumber,
                scores
            })
            res.json({
                message:'Result saved successfully',
                result
            })
        }catch(error){
            res.status(500).send({
                message:'Server Error',
                error
            })
        }
    }
)

export const EditResult = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const {scores} = req.body
        const resultId = req.params.id
        try{
            const result = await Result.findByIdAndUpdate(resultId, {
                scores
            }, {new:true})
            res.json({
                message:'Student result modified',
                result
            })
        }catch(error){
            res.status(500).send({
                message:'Server Error',
                error
            })
        }
    }
)