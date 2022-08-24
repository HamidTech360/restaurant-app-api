"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "User",
    },
    replies: {
        type: [mongoose_1.SchemaTypes.ObjectId],
        ref: "Comment",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Comment = mongoose_1.models.Comment || (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;
