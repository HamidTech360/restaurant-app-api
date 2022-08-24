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
exports.unFollowUser = exports.followUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
//@route: /api/users
//@method: GET
//@access: public
exports.getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const perPage = Number(req.query.perPage) || 25;
        const page = Number(req.query.page) || 0;
        const count = yield User_1.default.find().estimatedDocumentCount();
        const numPages = Math.ceil(count / perPage);
        const users = yield User_1.default.find()
            .sort({ createdAt: -1 })
            .limit(perPage)
            .skip(page * perPage);
        res.status(200).json({ users, count, numPages });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}));
//@route: ./api/users/:id
//@method: GET
//@access public
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id).populate("followers");
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, req.body));
        res.json({
            status: "success",
            message: "User updated",
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.followUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const me = yield User_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, {
            $addToSet: { following: [req.params.id] },
        });
        const them = yield User_1.default.findByIdAndUpdate(req.params.id, {
            $addToSet: { followers: [req.params.id] },
        });
        res.status(200).json("followed");
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.unFollowUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const me = yield User_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, {
            $pull: { following: { $in: [req.params.id] } },
        });
        const them = yield User_1.default.findByIdAndUpdate(req.params.id, {
            $pull: { followers: { $in: [req.params.id] } },
        });
        res.status(200).json("unfollowed");
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
