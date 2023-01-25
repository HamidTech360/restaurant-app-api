import { Notification } from "../models/notification";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";


export const createNotification = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        try{
            const {header, body} = req.body
            const newNotification = await Notification.create({
                header,
                body
            })
            res.send({
                message:'Notification saved',
                notification:newNotification
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to save Notification'
            })
        }
    }
)


export const EditNotification = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        const id = req.params.id
        const {header, body} = req.body
        try{
            const edited = await Notification.findByIdAndUpdate(id, {
                ...(header && {header}),
                ...(body && {body}),
            }, {new:true}) 
            res.send({
                message:'Notification Edited',
                notification:edited
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to edit Notification'
            })
        }
    }
)

export const getAllNotifications = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        try{
            const notifications = await Notification.find()
            res.send({
                message:'notification fetched',
                notifications
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to get notifications'
            })
        }
    }
)

export const getSingleNotification = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        const id = req.params.id
        try{
            const notification = await Notification.findById(id)
            res.send({
                message:'notification fetched',
                notification
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to get notification'
            })
        }
    }
)


export const DeleteNotification = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        const id = req.params.id
        try{
            await Notification.findByIdAndDelete(id)
            res.send({
                message:'Notification deleted',
            })
        }catch(error){
            res.status(500).send({
                message:'Failed to delete notification'
            })
        }
    }
)

