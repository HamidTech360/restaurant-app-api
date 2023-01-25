import { Event } from "../models/events";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

// export const createEvent = expressAsyncHandler(
//     async(req:Request, res:Response)=>{
//         try{

//         }catch(error){
//             res.status(500).send({
//                 message:'Failed to save Event'
//             })
//         }
//     }
// )

export const createEvent = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        try{
            const {header, body} = req.body
            const newEvent = await Event.create({
                header,
                body
            })
            res.send({
                message:'Event saved',
                event:newEvent
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to save Event'
            })
        }
    }
)


export const EditEvent = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        const id = req.params.id
        const {header, body} = req.body
        try{
            const edited = await Event.findByIdAndUpdate(id, {
                ...(header && {header}),
                ...(body && {body}),
            }, {new:true}) 
            res.send({
                message:'Event Edited',
                event:edited
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to edit Event'
            })
        }
    }
)

export const getAllEvents = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        try{
            const events = await Event.find()
            res.send({
                message:'Events fetched',
                event:events
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to get Events'
            })
        }
    }
)

export const getSingleEvent = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        const id = req.params.id
        try{
            const event = await Event.findById(id)
            res.send({
                message:'Event fetched',
                event:event
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to get Events'
            })
        }
    }
)


export const DeleteEvent = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        const id = req.params.id
        try{
            await Event.findByIdAndDelete(id)
            res.send({
                message:'Event deleted',
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to delete Events'
            })
        }
    }
)

