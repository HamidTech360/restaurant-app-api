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

export const getSingleStudent = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const id = req.params.id
        try{
            const student = await Student.findById(id)
            res.json({
                message:'Student record fetched',
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

export const updateStudentRecord = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const id = req.params.id
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
        try{
            const student = await Student.findByIdAndUpdate(id,{
                ...(firstName && {firstName}),
                ...(lastName && {lastName}),
                ...(gender && {gender}),
                ...(dob && {dob}),
                ...(admissionDate && {admissionDate}),
                ...(address && {address}),
                ...(state && {state}),
                ...(level && {level}),
                ...(parentName && {parentName}),
                ...(parentAddress && {parentAddress}),
                ...(phoneNumber && {phoneNumber}),
            } , {new:true})
            res.json({
                message:'Student record updated successfully',
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