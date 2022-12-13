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
exports.updateStudentRecord = exports.getSingleStudent = exports.getAllStudents = exports.createStudentRecord = void 0;
const students_1 = require("../models/students");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const student_1 = require("../validators/student");
exports.createStudentRecord = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, gender, dob, admissionDate, address, state, level, parentName, parentAddress, phoneNumber } = req.body;
        const { error } = (0, student_1.createStudentValidator)(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        const count = yield students_1.Student.countDocuments();
        const formatDigit = (number) => {
            let s__number = `000${number}`;
            s__number = s__number.slice(-3);
            const id = `KA/${s__number}`;
            return id;
        };
        const student = yield students_1.Student.create({
            firstName,
            lastName,
            gender,
            dob,
            admissionDate,
            address,
            state,
            level,
            regNumber: formatDigit(count + 1),
            parentName,
            parentAddress,
            phoneNumber
        });
        res.json({
            message: 'New student created',
            student
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
exports.getAllStudents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield students_1.Student.find()
            .sort({ level: 1 });
        res.json({
            message: 'All students record fetched',
            students
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
exports.getSingleStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const student = yield students_1.Student.findById(id);
        res.json({
            message: 'Student record fetched',
            student
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
exports.updateStudentRecord = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { firstName, lastName, gender, dob, admissionDate, address, state, level, parentName, parentAddress, phoneNumber } = req.body;
    try {
        const student = yield students_1.Student.findByIdAndUpdate(id, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (firstName && { firstName })), (lastName && { lastName })), (gender && { gender })), (dob && { dob })), (admissionDate && { admissionDate })), (address && { address })), (state && { state })), (level && { level })), (parentName && { parentName })), (parentAddress && { parentAddress })), (phoneNumber && { phoneNumber })), { new: true });
        res.json({
            message: 'Student record updated successfully',
            student
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
