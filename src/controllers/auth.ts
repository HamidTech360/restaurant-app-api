import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { createUserValidator, loginValidator } from "../validators/auth";
import { User } from "../models/user";
import bcrypt from 'bcryptjs'
import { sendMail } from "../utils/mail";
import { createAccountTemplate } from "../utils/templates/mail";
import { generateAccessToken } from "../utils/token";

//@ts-ignore

export const testAuth = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        res.json({
            message:'API is Live'
        })
    }
)

export const login = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const {password, username} = req.body
            const {error} = loginValidator(req.body)
            if(error) {
                res.status(400).send(error.details[0].message)
                return
            }
            
            const user= await User.findOne({username})
            if(!user) {
                 res.status(400).send('Invalid username or email')
                 return
            }
           
            
            if(!( await bcrypt.compare(password, user.password))){
                    res.status(400).send('Invalid Password')
                    return
            }
            const accessToken = generateAccessToken({sub:user._id})

            res.json({
                message:'Authentication successful',
                accessToken
            })



        }catch(error){
            res.status(500).send({
                message:'Server Error',
                error
            })
            
        }
    }
)

export const CreateAccount = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        const {email, password, username} = req.body

        const {error} = createUserValidator(req.body)
        if(error) {
             res.status(400).send(error.details[0].message)
             return
        }
        
        try{
            const checkEmail = await User.findOne({email})
            if(checkEmail){
                  res.status(400).send('Email already exist')
                  return
            }

            const user = await User.create({
                email,
                password,
                username
            })
            sendMail('owolabihammed3600@gmail.com', "Account createtion alert", createAccountTemplate())
            res.json({
                message:'User Account created',
                user
            })
        }catch(error){
            res.status(500).send({
                message:'Server Errror'
            })
        }
    }
)

