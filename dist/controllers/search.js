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
exports.search = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Gist_1 = __importDefault(require("../models/Gist"));
const Group_1 = __importDefault(require("../models/Group"));
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
//@Route /api/search
//@ Desc search
//@Access Public
exports.search = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword, type } = req.query;
        const queries = {
            user: yield User_1.default.find({
                $or: [
                    { firstName: { $regex: keyword, $options: "i" } },
                    { lastName: { $regex: keyword, $options: "i" } },
                ],
            }),
            post: yield Post_1.default.find({
                $or: [
                    { postTitle: { $regex: keyword, $options: "i" } },
                    { postBody: { $regex: keyword, $options: "i" } },
                ],
            }),
            gist: yield Gist_1.default.find({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { post: { $regex: keyword, $options: "i" } },
                    { categories: { $regex: keyword, $options: "i" } },
                ],
            }),
            group: yield Group_1.default.find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            }),
        };
        //@ts-ignore
        const response = queries[type];
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
}));
