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
exports.getBookMarks = exports.RemoveFromBookmark = exports.AddToBookMark = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
exports.AddToBookMark = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.query;
    console.log(id, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    try {
        yield User_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, {
            $addToSet: {
                bookmarks: id,
            },
        });
        res.json({
            message: "Post bookmarked",
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.RemoveFromBookmark = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.query;
    try {
        yield User_1.default.findByIdAndUpdate((_c = req.user) === null || _c === void 0 ? void 0 : _c._id, {
            $pull: { bookmarks: id },
        });
        res.json({
            message: "Post removed from bookmarks",
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.getBookMarks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const posts = yield User_1.default.findById((_d = req.user) === null || _d === void 0 ? void 0 : _d._id)
            .select("bookmarks")
            .populate({
            path: "bookmarks",
            populate: {
                path: "author comments",
                select: "firstName lastName avatar",
            },
        });
        res.json({
            message: "Bookmarks fetched",
            posts,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
