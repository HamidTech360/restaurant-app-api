import mongoose from 'mongoose'


const eventSchema = new mongoose.Schema({
    header:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    eventDate:{
        type:String,
        required:true
    }
}, {timestamps:true})


export const Event = mongoose.model('event', eventSchema)