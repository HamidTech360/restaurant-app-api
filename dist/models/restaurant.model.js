"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    ratings: {
        type: String,
        required: true,
    },
    star: {
        type: String,
        required: true,
    },
    recipes: { type: [String] },
}, { timestamps: true });
const Restaurant = mongoose_1.default.models.Restaurant || mongoose_1.default.model("Restaurant", restaurantSchema);
exports.default = Restaurant;
