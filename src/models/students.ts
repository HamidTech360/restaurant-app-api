import mongoose, { Types, Schema, SchemaTypes, models } from "mongoose";


const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    admissionDate:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        required:true
    },
    results:{
        type: [Schema.Types.ObjectId],
        ref:"Result"
    },
    regNumber:{
        type:String,
        required:true
    },
    parentName:{
        type:String,
        required:true
    },
    parentAddress:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
}, {timestamps:true})



export const Student = mongoose.models.Student || mongoose.model('Student', studentSchema)