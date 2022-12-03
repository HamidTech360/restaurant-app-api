import mongoose, { Types, Schema, SchemaTypes, models } from "mongoose";



const resultSchema = new mongoose.Schema({
    studentId:{
        type:String,
        required:true
    },
    subjects:{
        type:[String],
        required:true
    },
    testResult:{
        type:[Number],
        required:true
    },
    examResult:{
        type:[Number],
        required:true
    }
}, {timestamps:true})



export const Result = mongoose.models.Result || mongoose.model('Result', resultSchema)