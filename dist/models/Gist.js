"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const gistSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    comments: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Comment",
    },
}, { timestamps: true });
const Gist = mongoose_1.models.Gist || mongoose_1.default.model("Gist", gistSchema);
exports.default = Gist;
