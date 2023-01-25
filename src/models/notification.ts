import mongoose from 'mongoose'


const notifcationSchema = new mongoose.Schema({
    header:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
}, {timestamps:true})


export const Notification = mongoose.model('notification', notifcationSchema)