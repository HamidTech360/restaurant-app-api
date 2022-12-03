import { Request, Response } from "express";
import { Student } from "../models/students";
import expressAsyncHandler from "express-async-handler";
import { createStudentValidator } from "../validators/student";

export const createStudentRecord = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const {
                firstName,
                lastName,
                gender,
                dob,
                admissionDate,
                address,
                state,
                level,
                parentName,
                parentAddress,
                phoneNumber
            } = req.body

            const {error} = createStudentValidator(req.body)
            if(error) {
                res.status(400).send(error.details[0].message)
                return
            }

            const count = await Student.countDocuments()

            const formatDigit  = (number:number)=>{
                let s__number = `000${number}`
                s__number = s__number.slice(-3)
                const id = `KA/${s__number}`
                return id
            }
            

            const student = await Student.create({
                firstName,
                lastName,
                gender,
                dob,
                admissionDate,
                address,
                state,
                level,
                regNumber:formatDigit(count+1),
                parentName,
                parentAddress,
                phoneNumber
            }) 

            res.json({
                message:'New student created',
                student
            })
        }catch(error){
            res.status(500).send({
                message:'Server Error',
                error
            })
        }
    }
)

export const getAllStudents = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const students = await Student.find()               
                            .sort({level:1})
                
            res.json({
                message:'All students record fetched',
                students
            })
        }catch(error){
            res.status(500).send({
                message:'Server Error',
                error
            })
        }
    }
)