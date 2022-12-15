import mongoose, { Types, Schema, SchemaTypes, models } from "mongoose";


//This schema is structured in the followng way
//The score field is expected to be an array of scrore arrays 
// e.g [["English", 20, 60], ["Maths", 20, 70], ["IRS", 20, 50]]
//
//  Here, every element is an array of a course result 
//   item1 in each inner array = course title
//   item2 in each inner array = semester 1 test score
//   item3 in each inner array = semester 1 exam score
//   item3 in each inner array = semester 2 test score
//   item4 in each inner array = semester 2 exam score

const resultSchema = new mongoose.Schema({
    regNumber:{
        type:String,
        required:true
    },
    session:{
        type:String,
        required:true
    },
    scores:{
        type:[[String]],
        required:true
    },
    // examResult:{
    //     type:[[String]],
    //     required:true
    // }
}, {timestamps:true})



export const Result = mongoose.models.Result || mongoose.model('Result', resultSchema)