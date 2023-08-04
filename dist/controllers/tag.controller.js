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
exports.getTags = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const tags_model_1 = __importDefault(require("../models/tags.model"));
//@Route /api/v1/restaurant/tags
//@Method GET
//@Access:  unauthenticated
exports.getTags = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield tags_model_1.default.find();
        res.status(201).json({ msg: "Tags fetched", tags });
    }
    catch (error) {
        res.status(500).send({
            message: 'server error',
            error
        });
    }
}));
