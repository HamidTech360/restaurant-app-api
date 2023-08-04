"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRestaurant = exports.getRestaurants = exports.createRestaurant = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
//@Route /api/v1/restaurant
//@Method POST
//@Access:  unauthenticated
exports.createRestaurant = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, recipes, ratings, star } = req.body;
    const restaurant = yield restaurant_model_1.default.create({
        name,
        recipes,
        ratings,
        star
    });
    res.status(201).json({ msg: "Restaurant created", restaurant });
}));
//@Route /api/v1/restaurant
//@Method GET
//@Access: unauthenticated
exports.getRestaurants = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipe, sortBy } = req.query;
        const totalRestaurants = yield restaurant_model_1.default.countDocuments();
        console.log(recipe);
        const restaurants = yield restaurant_model_1.default.find(
        //@ts-ignore
        recipe && { recipes: { $in: recipe } })
            .sort(Object.assign(Object.assign(Object.assign({}, (sortBy == 'newest' && { createdAt: -1 })), (sortBy == 'ratings' && { ratings: -1 })), (sortBy == 'star' && { star: -1 })));
        res.json({
            message: 'Restaurant fetched successfully',
            restaurants,
            totalRestaurants,
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
//@Route /api/v1/restaurant/search
//@Method GET
//@Access:  unauthenticated
exports.searchRestaurant = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    const restaurants = yield restaurant_model_1.default.find({ name: { $regex: keyword, $options: "i" } });
    res.status(201).json({ msg: "Restaurant fetched", restaurants });
}));
