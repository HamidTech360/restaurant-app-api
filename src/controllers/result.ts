import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Result } from "../models/results";
import { Student } from "../models/students";

export const uploadResult = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const {scores, regNumber, session} = req.body
        try{
            const checkReg = await Student.findOne({regNumber})
            if(!checkReg){
                res.status(400).send({
                    message:'Student with this regNumber does not exist'
                })
            }
            const result = await Result.create({
                regNumber,
                scores,
                session
            })

            const updateStudent = await Student.findOneAndUpdate({regNumber}, {
                $addToSet:{results:result._id}
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

export const getStudentResults = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        const id = req.params.id
        try{
            const result = await Student.findById(id)
                    .populate("results")

                    res.json({
                        message:'Student result fetched',
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

export const getSingleResult = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        const id = req.params.id
        try{
            const result = await Result.findById(id)

                res.json({
                    message:'single result fetched',
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