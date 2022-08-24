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
exports.getRandomGroupFeed = exports.getGroupFeed = exports.fetchFeed = exports.fetchFeeds = exports.saveFeed = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Feed_1 = __importDefault(require("../models/Feed"));
exports.saveFeed = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { post, group } = req.body;
    try {
        const feed = yield Feed_1.default.create({
            post,
            author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            group,
        });
        res.json({
            status: "success",
            message: "Feed created",
            feed,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.fetchFeeds = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const perPage = Number(req.query.perPage) || 25;
        const page = Number(req.query.page) || 0;
        const count = yield Feed_1.default.find().estimatedDocumentCount();
        const numPages = Math.ceil(count / perPage);
        const feed = yield Feed_1.default.find({
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
            message: "Feed retrieved",
            feed,
            count,
            numPages,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.fetchFeed = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const feed = yield Feed_1.default.findById(id)
        .populate("author", "firstName lastName avatar")
        .populate("group")
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
    res.status(200).json(feed);
}));
//@Routes /api/posts/group/:id
//Method get
//@ccess: loggedIn
exports.getGroupFeed = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.id;
    console.log(groupId);
    try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======

>>>>>>> 7a1c18029dbb431114f38f5696c03e45e4762948
=======
>>>>>>> dd15352676e3f1768d60297be462f71e25a4718f
=======

>>>>>>> 66d0ccfa38e869a0be8609de745db17382f217ab
        const perPage = Number(req.query.perPage) || 25;
        const page = Number(req.query.page) || 0;
        const count = yield Feed_1.default.find().estimatedDocumentCount();
        const numPages = Math.ceil(count / perPage);

        const posts = yield Feed_1.default.find({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
            group: groupId,
        })
            .sort({ createdAt: -1 })

            .populate("group", "name")
            .populate("author", "-password")
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        res.status(200).json({ msg: " Group Posts retrieved", posts });
=======
=======

>>>>>>> 7a1c18029dbb431114f38f5696c03e45e4762948
=======
>>>>>>> dd15352676e3f1768d60297be462f71e25a4718f
=======

        res.status(200).json({ msg: " Group Posts retrieved", posts });

>>>>>>> 66d0ccfa38e869a0be8609de745db17382f217ab
        res.json({
            status: "success",
            message: "Group feed retrieved",
            posts,
            count,
            numPages,
        });

    }
    catch (error) {
        res.status(500).json(error);
    }
}));
//@Routes /api/posts/group/:id
//Method get
//@ccess: loggedIn
exports.getRandomGroupFeed = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======

>>>>>>> 7a1c18029dbb431114f38f5696c03e45e4762948
=======
>>>>>>> dd15352676e3f1768d60297be462f71e25a4718f
=======

>>>>>>> 66d0ccfa38e869a0be8609de745db17382f217ab
        const perPage = Number(req.query.perPage) || 25;
        const page = Number(req.query.page) || 0;
        const count = yield Feed_1.default.find().estimatedDocumentCount();
        const numPages = Math.ceil(count / perPage);
        const posts = yield Feed_1.default.find({
            group: { $ne: null },
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        res.status(200).json({ msg: "Random group posts retrieved", posts });
=======
=======

>>>>>>> 7a1c18029dbb431114f38f5696c03e45e4762948
=======
>>>>>>> dd15352676e3f1768d60297be462f71e25a4718f
=======

        res.status(200).json({ msg: "Random group posts retrieved", posts });
>>>>>>> 66d0ccfa38e869a0be8609de745db17382f217ab
        res.json({
            status: "success",
            message: "Group feed retrieved",
            posts,
            count,
            numPages,
        });
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 6e4eab027056f87dd130241b704165e5f2ec6b4e
=======

>>>>>>> 7a1c18029dbb431114f38f5696c03e45e4762948
=======
>>>>>>> dd15352676e3f1768d60297be462f71e25a4718f
=======

>>>>>>> 66d0ccfa38e869a0be8609de745db17382f217ab
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
