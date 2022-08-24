"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Chat = mongoose_1.models.Chat || (0, mongoose_1.model)("Chat", chatSchema);
exports.default = Chat;
