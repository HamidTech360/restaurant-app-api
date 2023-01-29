import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Student } from "../models/students";
import { Event } from "../models/events";
import { Notification } from "../models/notification";

export const getAnalytics = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const totalStudents = await Student.countDocuments()
            const totalEvents = await Event.countDocuments()
            const activeStudents = await Student.countDocuments({level:{$ne:11}})

            const notifications = await Notification.find()
                                        .sort({ createdAt: -1 })
                                        .limit(4)
            res.json({
                activeStudents,
                totalStudents,
                totalEvents,
                notifications
            })
            

        }catch(error){
            res.status(500).send({
                message:'Server Error',
                error
            }) 
        }
    }
)