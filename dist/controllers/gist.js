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
exports.updateGist = exports.deleteGist = exports.fetchSingleGist = exports.fetchAllGist = exports.createGist = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Gist_1 = __importDefault(require("../models/Gist"));
//import {validateGist} from '../validators/gist'
exports.createGist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, post, country, categories } = req.body;
        // const error = validateGist(req.body)
        // if(error) {
        //     res.status(400).json(error.details[0].message)
        //     return
        // }
        const gist = yield Gist_1.default.create({
            title,
            post,
            country,
            categories,
            author: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        res.status(201).json({ message: "Gist created", gist });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Something went wrong" });
    }
}));
exports.fetchAllGist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const perPage = Number(req.query.perPage) || 25;
        const page = Number(req.query.page) || 0;
        const count = yield Gist_1.default.find().estimatedDocumentCount();
        const numPages = Math.ceil(count / perPage);
        const gists = yield Gist_1.default.find()
            .where({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
        })
            .sort({ createdAt: -1 })
            .limit(perPage)
            .skip(page * perPage)
            .populate("author", "firstName lastName avatar")
            .populate({
            path: "comments",
            populate: { path: "author", select: "firstName lastName avatar" },
        })
            .populate({
            path: "comments",
            populate: {
                path: "replies",
                populate: { path: "author", select: "firstName lastName avatar" },
            },
        });
        res.json({
            status: "success",
            message: "Gists retrieved",
            gists,
            count,
            numPages,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Something went wrong" });
    }
}));
exports.fetchSingleGist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gistID = req.params.id;
    try {
        const gist = yield Gist_1.default.findById(gistID)
            .where({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
        })
            .populate("author", "firstName lastName avatar")
            .populate({
            path: "comments",
            populate: { path: "author", select: "firstName lastName avatar" },
        })
            .populate({
            path: "comments",
            populate: {
                path: "replies",
                populate: { path: "author", select: "firstName lastName avatar" },
            },
        });
        res.json({
            status: "success",
            message: "Gist fetched",
            gist,
        });
    }
    catch (error) {
        res.status(500).json({ error: error, message: "Something went wrong" });
    }
}));
exports.deleteGist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const gistID = req.params.id;
    try {
        //find gist with gistID and delete
        const gist = yield Gist_1.default.findById(gistID)
            .where({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
        })
            .catch((error) => console.log(error));
        if (gist && gist.author.toString() === ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
            gist.deleted === true;
            yield gist.save();
            res.status(200).json({ msg: "Gist deleted" });
        }
        else {
            res.status(404).json({ msg: "Gist not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Something went wrong" });
    }
}));
exports.updateGist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const gistID = req.params.id;
    const gist = yield Gist_1.default.findById(gistID).where({
        $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
    });
    if (gist && gist.author.toString() === ((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id.toString())) {
        const gistKeys = Object.keys(req.body);
        for (let i = 0; i < gistKeys.length; i++) {
            gist[gistKeys[i]] = req.body[gistKeys[i]];
        }
        const updatedGist = yield gist.save();
        res.status(200).json(updatedGist);
    }
    else {
        res.status(404).json({ msg: "Gist not found" });
    }
}));
