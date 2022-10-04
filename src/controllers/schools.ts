import axios from "axios";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import School from "../models/schools";

export const createSchoolRecord = expressAsyncHandler(
    async(req:any, res:Response)=>{
        console.log(req.body)
        const {
            schoolName,
            department,
            fee,
            faculty,
            country,
            email,
            website,
            courseOverview,
            funding,
            requirement,
            services,
            aboutSchool,
            contact
        } = req.body
        try{
            const school = await School.create({
                schoolName,
                department,
                fee,
                faculty,
                country,
                email,
                website,
                courseOverview,
                funding,
                requirement,
                services,
                aboutSchool, 
                contact,
                author:req.user._id
            })

            res.json({
                message:'New record created',
                school
            })

        }catch(error){
            res.status(500).send({
                message:'Server error',
                error
            })
        }
    }
)

export const getAllSchools = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        try{
            const schools = await School.find({
                $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
              }).populate("author")

            res.json({
                message:'All schools fetched',
                schools
            })
        }catch(error){
            res.status(500).send({
                message:'Server error',
                error
            })
        }
    }
)

export const getSingleSchool = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        try{
            const school = await School.findById(req.params.id)
                .where({
                    $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
            }).populate('author')
            res.json({
                message:'School record fetched',
                school
            })

        }catch(error){
            res.status(500).send({
                message:'Server error',
                error
            })
        }
    }
)

export const deleteSchool = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        try{
            const deleteSchool = await School.findByIdAndUpdate(req.params.id, {deleted:true})
            res.json({
                message:'School record deleted'
            })
        }catch(error){
            res.status(500).send({
                message:'Server error',
                error
            })
        }
    }
)

export const getUserUploads = expressAsyncHandler(
    async(req:any, res:any)=>{
            const id = req.params.id
          
        try{
           
            
            const schools = await School.find({author:id})
                .where({
                    $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
                }).populate('author')
            res.json({
                message:'User upload fetched',
                schools
            })
        }catch(error){
            res.status(500).send({
                message:'Server error',
                error
            })
        }
    }
)

export const searchSchool = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        try{
            const {keyword} = req.query
           
            const result = await School.find({
               $and:[
                { $or:[
                    {schoolName:{$regex:keyword, $options:"i"}},
                    {department:{$regex:keyword, $options:"i"}} ,
                    {faculty:{$regex:keyword, $options:"i"}},
                    {country:{$regex:keyword, $options:"i"}}  
                 ]
                },
                {
                    $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }]
                }
               ]
                
            }).populate("author")

            // .where({
            //     $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
            // })

            res.json({
                message:`${result.length} items returned from search query`,
                result
            })
        }catch(error){
            res.status(500).send({
                message:'Server error',
                error
            })
            console.log(error)
        }
    }
)

export const editSchoolRecord = expressAsyncHandler(
    async(req:any, res:any)=>{
        const {id} = req.params
        try{
            const {
                schoolName,
                department,
                fee,
                faculty,
                country,
                email,
                website,
                courseOverview,
                funding,
                requirement,
                services,
                aboutSchool,
                contact
            } = req.body

            const update = await School.findByIdAndUpdate(id, {
                ...(schoolName && { schoolName }),
                ...(department && { department }),
                ...(fee && { fee }),
                ...(faculty && { faculty }),
                ...(country && { country }),
                ...(email && { email }),
                ...(website && { website }),
                ...(courseOverview && { courseOverview }),
                ...(funding && { funding }),
                ...(requirement && { requirement }),
                ...(services && { services }),
                ...(aboutSchool && { aboutSchool }),
                ...(contact && { contact }),
            }, {new:true})
            res.json({
                message:'Record Updated',
                school:update
            })
        }catch(error){
            res.status(500).send({
                message:'Server error',
                error
            })
        }
    }
)

export const fetchDeleted = expressAsyncHandler(
    async(req:any, res:Response)=>{
        try{
            const items = await School.find({deleted:true, author:req.user?._id}).populate("author")

            res.json({
                message:'Trash items fetched',
                trash:items
            })
        }catch(error){
            res.status(500).send({
                message:'Server error',
                error
            })
        }
    }
)