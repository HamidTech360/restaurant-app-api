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
exports.getUserPosts = exports.deleteLike = exports.likePost = exports.updatePost = exports.deletePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Post_1 = __importDefault(require("../models/Post"));
//@Route /api/posts
//@Method POST
//@Access: LoggedIn
exports.createPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { postTitle, postBody, groupId } = req.body;
    const post = yield Post_1.default.create({
        postTitle,
        postBody,
        author: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
        groupId,
    });
    res.status(201).json({ msg: "Post created", post });
}));
//@Route /api/posts
//@Method Get
//@Access: Public
exports.getPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const perPage = Number(req.query.perPage) || 25;
    const page = Number(req.query.page) || 0;
    const count = yield Post_1.default.find().estimatedDocumentCount();
    const numPages = Math.ceil(count / perPage);
    const posts = yield Post_1.default.find({
        $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
    })
        .sort({ createdAt: -1 })
        .limit(perPage)
        .skip(page * perPage)
        .populate("author", "-password")
        .populate({
        path: "comments",
        populate: {
            path: "author",
            select: "firstName lastName avatar",
        },
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
        message: "User posts retrieved",
        posts,
        count,
        numPages,
    });
}));
//@Route /api/posts/:id
//@Method Get
//@Access: Public
exports.getPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const post = yield Post_1.default.findById(postId)
        .populate("author", "firstName lastName")
        .populate({
        path: "comments",
        populate: { path: "author", select: "firstName lastName avatar" },
    })
        .populate({
        path: "comments",
        populate: { path: "author", select: "firstName lastName avatar" },
    })
        .where({
        $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
    });
    if (post) {
        res.status(200).json({ msg: "Posts retrieved", post });
    }
    else {
        res.status(404).json({ msg: "Post not found" });
    }
}));
//@Route /api/posts/:id
//@Method Delete
//@Access: LoggedIn
exports.deletePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const postId = req.params.id;
    const post = yield Post_1.default.findById(postId).where({
        $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
    });
    if (post && post.author.toString() === ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
        post.deleted === true;
        yield post.save();
        res.status(200).json({ msg: "Post deleted" });
    }
    else {
        res.status(404).json({ msg: "Post not found" });
    }
}));
//@Route /api/posts/:id
//@Method Put
//@Access: LoggedIn
exports.updatePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const postId = req.params.id;
    const post = yield Post_1.default.findById(postId).where({
        $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
    });
    if (post && post.author.toString() === ((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id.toString())) {
        const postKeys = Object.keys(req.body);
        for (let i = 0; i < postKeys.length; i++) {
            post[postKeys[i]] = req.body[postKeys[i]];
        }
        const updatedPost = yield post.save();
        res.status(200).json(updatedPost);
    }
    else {
        res.status(404).json({ msg: "Post not found" });
    }
}));
//@Route /api/posts/:id
//@Method Put
//@Access: LoggedIn
exports.likePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const postId = req.params.id;
        const post = yield Post_1.default.findByIdAndUpdate(postId, {
            $addToSet: { likes: [(_d = req.user) === null || _d === void 0 ? void 0 : _d._id] },
        }).where({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
        });
        res.status(200).json("Liked");
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//@Route /api/posts/:id/like
//@Method Put
//@Access: LoggedIn
exports.deleteLike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const postId = req.params.id;
        const post = yield Post_1.default.findByIdAndUpdate(postId, {
            $pull: { likes: [(_e = req.user) === null || _e === void 0 ? void 0 : _e._id] },
        }).where({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
        });
        res.status(200).json("Unliked");
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//@Routes /api/posts/user/:id
//Method get
//@ccess: loggedIn
exports.getUserPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        const perPage = Number(req.query.perPage) || 25;
        const page = Number(req.query.page) || 0;
        const count = yield Post_1.default.find().estimatedDocumentCount();
        const numPages = Math.ceil(count / perPage);
        const posts = yield Post_1.default.find({
            $and: [
                {
                    $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
                },
                {
                    $or: [
                        { author: (_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f._id },
                        { likes: { $in: (_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g._id } },
                        // {following:{"$in":req?.user?._id}}
                    ],
                },
            ],
        })
            .sort({ createdAt: -1 })
            .limit(perPage)
            .skip(page * perPage)
            .populate("author", "-password")
            .populate({
            path: "comments",
            populate: { path: "author", select: "firstName lastName avatar" },
        })
            .populate({
            path: "comments",
            populate: { path: "author", select: "firstName lastName avatar" },
        });
        res.json({
            status: "success",
            message: "User posts retrieved",
            posts,
            count,
            numPages,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
