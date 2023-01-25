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
exports.DeleteNotification = exports.getSingleNotification = exports.getAllNotifications = exports.EditNotification = exports.createNotification = void 0;
const notification_1 = require("../models/notification");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.createNotification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { header, body } = req.body;
        const newNotification = yield notification_1.Notification.create({
            header,
            body
        });
        res.send({
            message: 'Notification saved',
            notification: newNotification
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to save Notification'
        });
    }
}));
exports.EditNotification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { header, body } = req.body;
    try {
        const edited = yield notification_1.Notification.findByIdAndUpdate(id, Object.assign(Object.assign({}, (header && { header })), (body && { body })), { new: true });
        res.send({
            message: 'Notification Edited',
            notification: edited
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to edit Notification'
        });
    }
}));
exports.getAllNotifications = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notification_1.Notification.find();
        res.send({
            message: 'notification fetched',
            notifications
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to get notifications'
        });
    }
}));
exports.getSingleNotification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const notification = yield notification_1.Notification.findById(id);
        res.send({
            message: 'notification fetched',
            notification
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to get notification'
        });
    }
}));
exports.DeleteNotification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield notification_1.Notification.findByIdAndDelete(id);
        res.send({
            message: 'Notification deleted',
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to delete notification'
        });
    }
}));
