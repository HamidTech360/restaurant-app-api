import mongoose from 'mongoose'


const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:'5m'
    }
})


export const OTP = mongoose.model('otp', otpSchema)