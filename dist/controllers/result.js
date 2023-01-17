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
exports.getSingleResult = exports.getStudentResults = exports.EditResult = exports.uploadResult = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const results_1 = require("../models/results");
const students_1 = require("../models/students");
exports.uploadResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { scores, regNumber, session } = req.body;
    try {
        const checkReg = yield students_1.Student.findOne({ regNumber });
        if (!checkReg) {
            res.status(400).send({
                message: 'Student with this regNumber does not exist'
            });
        }
        const result = yield results_1.Result.create({
            regNumber,
            scores,
            session
        });
        const updateStudent = yield students_1.Student.findOneAndUpdate({ regNumber }, {
            $addToSet: { results: result._id }
        });
        res.json({
            message: 'Result saved successfully',
            result
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
exports.EditResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { scores } = req.body;
    const resultId = req.params.id;
    try {
        const result = yield results_1.Result.findByIdAndUpdate(resultId, {
            scores
        }, { new: true });
        res.json({
            message: 'Student result modified',
            result
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
exports.getStudentResults = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield students_1.Student.findById(id)
            .populate("results");
        res.json({
            message: 'Student result fetched',
            result
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
exports.getSingleResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield results_1.Result.findById(id);
        res.json({
            message: 'single result fetched',
            result
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
