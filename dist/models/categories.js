"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['post', 'gist', 'feed']
    }
}, { timestamps: true });
const Category = mongoose_1.models.Category || (0, mongoose_1.model)("Category", categorySchema);
exports.default = Category;
