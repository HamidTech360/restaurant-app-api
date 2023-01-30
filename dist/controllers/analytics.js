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
exports.getAnalytics = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const students_1 = require("../models/students");
const events_1 = require("../models/events");
const notification_1 = require("../models/notification");
const staff_1 = require("../models/staff");
exports.getAnalytics = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalStudents = yield students_1.Student.countDocuments();
        const totalEvents = yield events_1.Event.countDocuments();
        const totalStaffs = yield staff_1.Staff.countDocuments();
        const activeStudents = yield students_1.Student.countDocuments({ level: { $lt: 11 } });
        const notifications = yield notification_1.Notification.find()
            .sort({ createdAt: -1 })
            .limit(4);
        const staffs = yield staff_1.Staff.find();
        res.json({
            activeStudents,
            totalStaffs,
            totalStudents,
            totalEvents,
            notifications,
            staffs
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
