import mongoose, { Types, Schema, SchemaTypes, models } from "mongoose";


const tokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:18000
    }
})


export const Token = mongoose.model('token', tokenSchema)