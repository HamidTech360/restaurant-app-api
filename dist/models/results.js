"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resultSchema = new mongoose_1.default.Schema({
    studentId: {
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    },
    testResult: {
        type: [Number],
        required: true
    },
    examResult: {
        type: [Number],
        required: true
    }
}, { timestamps: true });
exports.Result = mongoose_1.default.models.Result || mongoose_1.default.model('Result', resultSchema);
