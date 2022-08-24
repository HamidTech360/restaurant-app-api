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
exports.updateCategory = exports.deleteCategories = exports.getCategories = exports.createCategory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const categories_1 = __importDefault(require("../models/categories"));
exports.createCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type } = req.body;
    try {
        const newCategory = yield categories_1.default.create(Object.assign({}, req.body));
        res.json({
            message: 'category created',
            category: newCategory
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.getCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield categories_1.default.find();
        res.json({
            mesage: 'All categories fetched',
            allCategories
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.deleteCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_1.default.findByIdAndDelete(req.query.id);
        res.json({
            message: 'Category deleted'
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.updateCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_1.default.findByIdAndUpdate(req.query.id, Object.assign({}, req.body));
        res.json({
            message: 'Category updated!!'
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
