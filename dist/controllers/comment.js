"use strict";
//@Route /api/posts/:id/comment,
///@Method: Post
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
exports.comment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Comment_1 = __importDefault(require("../models/Comment"));
const Gist_1 = __importDefault(require("../models/Gist"));
const Post_1 = __importDefault(require("../models/Post"));
const Feed_1 = __importDefault(require("../models/Feed"));
//@Route: /api/comments/:type/:id
//@Access: LoggedIn
exports.comment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const type = req.query.type;
    const comment = yield Comment_1.default.create(Object.assign({ author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, req.body));
    if (type == "post") {
        yield Post_1.default.findByIdAndUpdate(req.query.id, {
            $addToSet: { comments: [comment._id] },
        });
    }
    else if (type == "gist") {
        yield Gist_1.default.findByIdAndUpdate(req.query.id, {
            $addToSet: { comments: [comment._id] },
        });
    }
    else if (type == "feed") {
        yield Feed_1.default.findByIdAndUpdate(req.query.id, {
            $addToSet: { comments: [comment._id] },
        });
    }
    else if (type == "reply") {
        console.log("replying");
        const reply = yield Comment_1.default.findByIdAndUpdate(req.query.id, {
            $addToSet: { replies: [comment._id] },
        });
        console.log(reply);
    }
    res
        .status(200)
        .json(yield comment.populate("author", "firstName lastName avatar"));
}));
