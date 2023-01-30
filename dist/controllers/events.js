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
exports.DeleteEvent = exports.getSingleEvent = exports.getAllEvents = exports.EditEvent = exports.createEvent = void 0;
const events_1 = require("../models/events");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// export const createEvent = expressAsyncHandler(
//     async(req:Request, res:Response)=>{
//         try{
//         }catch(error){
//             res.status(500).send({
//                 message:'Failed to save Event'
//             })
//         }
//     }
// )
exports.createEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { header, body, eventDate } = req.body;
        const newEvent = yield events_1.Event.create({
            header,
            body,
            eventDate
        });
        res.send({
            message: 'Event saved',
            event: newEvent
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to save Event'
        });
    }
}));
exports.EditEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { header, body } = req.body;
    try {
        const edited = yield events_1.Event.findByIdAndUpdate(id, Object.assign(Object.assign({}, (header && { header })), (body && { body })), { new: true });
        res.send({
            message: 'Event Edited',
            event: edited
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to edit Event'
        });
    }
}));
exports.getAllEvents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = req.query.limit;
    //console.log(req.query)
    try {
        const events = yield events_1.Event.find()
            .sort({ createdAt: -1 })
            //@ts-ignore
            .limit(parseInt(limit) || 10);
        res.send({
            message: 'Events fetched',
            event: events
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to get Events'
        });
    }
}));
exports.getSingleEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const event = yield events_1.Event.findById(id);
        res.send({
            message: 'Event fetched',
            event: event
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to get Events'
        });
    }
}));
exports.DeleteEvent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield events_1.Event.findByIdAndDelete(id);
        res.send({
            message: 'Event deleted',
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to delete Events'
        });
    }
}));
