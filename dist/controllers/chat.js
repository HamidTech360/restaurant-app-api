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
exports.fetchConversation = exports.saveMessage = exports.fetchMessages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chats_1 = __importDefault(require("../models/chats"));
exports.fetchMessages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const messages = yield chats_1.default.find({
            $or: [{ conversationId: `${(_a = req.user) === null || _a === void 0 ? void 0 : _a._id}-${req.query.mate}` }, { conversationId: `${req.query.mate}-${(_b = req.user) === null || _b === void 0 ? void 0 : _b._id}` }]
        }).populate("sender receiver");
        res.json({
            message: 'Messages fetched',
            messages
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.saveMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { message } = req.body;
    console.log('in the chat');
    console.log(req.body, req.query);
    try {
        const newMessage = yield chats_1.default.create({
            sender: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id,
            receiver: req.query.mate,
            conversationId: `${(_d = req.user) === null || _d === void 0 ? void 0 : _d._id}-${req.query.mate}`,
            message
        });
        res.json({
            message: 'Message saved',
            newMessage
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.fetchConversation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let discussions = [];
    try {
        const chats = yield chats_1.default.find().sort({ createdAt: -1 }).populate("sender receiver");
        chats.forEach((item) => {
            var _a;
            const members = item.conversationId.split("-");
            const members_c = [members[1], members[0]];
            // console.log(members, req.user?._id.valueOf(), members.indexOf(req.user?._id));
            if (members.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.valueOf())) {
                const findSimilar = discussions.find((item) => item.members.toString() == members.toString());
                const findSimilar_c = discussions.find((item) => item.members.toString() == members_c.toString());
                console.log(findSimilar);
                if (!findSimilar && !findSimilar_c) {
                    discussions.push(Object.assign(Object.assign({}, item._doc), { members }));
                }
                // if(discussions.members!==members){
                //     discussions.push({...item._doc, members})
                // }
            }
        });
        res.json({
            message: "Conversations fetched",
            conversations: discussions
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
