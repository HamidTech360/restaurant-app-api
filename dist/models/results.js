"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
const resultSchema = new mongoose_1.default.Schema({
    regNumber: {
        type: String,
        required: true
    },
    // subjects:{
    //     type:[String],
    //     required:true
    // },
    scores: {
        type: [[String]],
        required: true
    },
    // examResult:{
    //     type:[[String]],
    //     required:true
    // }
}, { timestamps: true });
exports.Result = mongoose_1.default.models.Result || mongoose_1.default.model('Result', resultSchema);
