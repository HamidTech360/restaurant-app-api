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
exports.editAccount = exports.CreateAccount = exports.login = exports.testAuth = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../validators/auth");
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mail_1 = require("../utils/mail");
const mail_2 = require("../utils/templates/mail");
const token_1 = require("../utils/token");
//@ts-ignore
exports.testAuth = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: 'API is Live'
    });
}));
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, username } = req.body;
        const { error } = (0, auth_1.loginValidator)(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        const user = yield user_1.User.findOne({ username });
        if (!user) {
            res.status(400).send('Invalid username or email');
            return;
        }
        if (!(yield bcryptjs_1.default.compare(password, user.password))) {
            res.status(400).send('Invalid Password');
            return;
        }
        const accessToken = (0, token_1.generateAccessToken)({ sub: user._id });
        res.json({
            message: 'Authentication successful',
            accessToken
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Error',
            error
        });
    }
}));
exports.CreateAccount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    const { error } = (0, auth_1.createUserValidator)(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        const checkEmail = yield user_1.User.findOne({ email });
        if (checkEmail) {
            res.status(400).send('Email already exist');
            return;
        }
        const user = yield user_1.User.create({
            email,
            password,
            username
        });
        (0, mail_1.sendMail)('owolabihammed3600@gmail.com', "Account createtion alert", (0, mail_2.createAccountTemplate)());
        res.json({
            message: 'User Account created',
            user
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Errror'
        });
    }
}));
exports.editAccount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, password, username } = req.body;
    try {
        const user = yield user_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        const salt = yield bcryptjs_1.default.genSalt(10);
        const newPassword = yield bcryptjs_1.default.hash(password, salt);
        yield user_1.User.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, Object.assign(Object.assign(Object.assign({}, (username && { username })), (email && { email })), (password && { password: newPassword })));
        res.json({
            message: 'Credential updated successfully'
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Server Errror'
        });
    }
}));
