"use strict";
//@Route /api/groups
//Method: Post
//@Access: loggedIn
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
exports.getUserGroups = exports.getGroups = exports.deleteGroup = exports.updateGroup = exports.getGroup = exports.createGroup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Group_1 = __importDefault(require("../models/Group"));
exports.createGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { name, description, privacy, invite, allowedToPost, groupMembers } = req.body;
    console.log(req.body);
    const group = yield Group_1.default.create({
        admin: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
        moderators: [(_b = req.user) === null || _b === void 0 ? void 0 : _b._id],
        description,
        name,
        invite,
        privacy,
        allowedToPost,
        groupMembers: [(_c = req.user) === null || _c === void 0 ? void 0 : _c._id, ...groupMembers]
    });
    res.status(201).json({ group });
}));
// @Route /api/groups/:id
// @Method: Get
// @Access: public
exports.getGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.id;
    const group = yield Group_1.default.findById(groupId).populate("admin groupMembers", "firstName");
    res.status(200).json(group);
}));
// @Route /api/groups/:id
// @Method: Put
// @Access: Private (Group admin/moderator)
exports.updateGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const groupId = req.params.id;
    const group = yield Group_1.default.findById(groupId);
    if (group.admin.toString() === ((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id.toString())) {
        const groupKeys = Object.keys(req.body);
        for (let i = 0; i < groupKeys.length; i++) {
            group[groupKeys[i]] = req.body[groupKeys[i]];
        }
        const updatedGroup = yield group.save();
        res.status(200).json(updatedGroup);
    }
    else {
        res.status(403).json("Unauthorised");
    }
}));
// @Route /api/groups/:id
// @Method: Delete
// @Access: Private (Group admin/moderator)
exports.deleteGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const groupId = req.params.id;
    const group = yield Group_1.default.findById(groupId);
    if (group.admin.toString() === ((_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e._id.toString())) {
        group.deleted = true;
        const updated = yield group.save();
        res.status(200).json(updated);
    }
    else {
        res.status(403).json("Unauthorised");
    }
}));
// @Route /api/groups/
// @Method: Get
// @Access: Public
exports.getGroups = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield Group_1.default.find({
        $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
    }).populate("admin", "-password");
    res.status(200).json(groups);
}));
exports.getUserGroups = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
    //console.log('User is a member of', req.user?._id);
    try {
        const groups = yield Group_1.default.find({
            groupMembers: {
                "$in": userId
            }
        }).sort({ createdAt: -1 })
            .populate('admin');
        console.log(groups);
        res.json({
            status: 'success',
            message: 'User groups retrieved',
            groups
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
