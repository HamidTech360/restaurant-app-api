import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { sendMail } from "../utils/mail";
import { generateOTPTemplate } from "../utils/templates/mail";
import { OTP } from "../models/otp";

export const getOTP = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const checkOTP = await OTP.find()

            if(checkOTP.length > 0){
               //send mail
               sendMail(['owolabihammed3600@gmail.com', 'hammedowolabi2001@gmail.com', 'khayruladab.ibadan@gmail.com'], "Authentication OTP", generateOTPTemplate(checkOTP[0].otp))
               res.send({
                    message:'OTP retrieved sent to the central Email'
               })
               return
            }

            const code = Math.floor(Math.random()* (999999-100000) + 1000000)
            const newOTP = await OTP.create({
                otp:code
            })

            //send mail
            sendMail(['owolabihammed3600@gmail.com', 'hammedowolabi2001@gmail.com', 'khayruladab.ibadan@gmail.com'], "Authentication OTP", generateOTPTemplate(code))
            res.send({
                message:'OTP sent to the central Email'
           })
            

        }catch(error){
            res.status(500).send({
                message:'Failed to generate OTP',
                error
            })
        }
    }
)

export const verifyOTP = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const checkOtp = await OTP.findOne({otp:req.body.otp})
            

            if(checkOtp){
                res.send({
                    message:'OTP verified'
                })
            }else{
                res.status(400).send({
                    message:'OTP is invalid'
                })
            }
        }catch(error){
            res.status(500).send({
                message:'Failed to verify OTP',
                error
            })
        }
    }
)