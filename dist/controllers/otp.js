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
exports.verifyOTP = exports.getOTP = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mail_1 = require("../utils/mail");
const mail_2 = require("../utils/templates/mail");
const otp_1 = require("../models/otp");
exports.getOTP = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkOTP = yield otp_1.OTP.find();
        if (checkOTP.length > 0) {
            //send mail
            (0, mail_1.sendMail)(['owolabihammed3600@gmail.com', 'hammedowolabi2001@gmail.com', 'khayruladab.ibadan@gmail.com'], "Authentication OTP", (0, mail_2.generateOTPTemplate)(checkOTP[0].otp));
            res.send({
                message: 'OTP retrieved sent to the central Email'
            });
            return;
        }
        const code = Math.floor(Math.random() * (999999 - 100000) + 1000000);
        const newOTP = yield otp_1.OTP.create({
            otp: code
        });
        //send mail
        (0, mail_1.sendMail)(['owolabihammed3600@gmail.com', 'hammedowolabi2001@gmail.com', 'khayruladab.ibadan@gmail.com'], "Authentication OTP", (0, mail_2.generateOTPTemplate)(code));
        res.send({
            message: 'OTP sent to the central Email'
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to generate OTP',
            error
        });
    }
}));
exports.verifyOTP = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkOtp = yield otp_1.OTP.findOne({ otp: req.body.otp });
        if (checkOtp) {
            res.send({
                message: 'OTP verified'
            });
        }
        else {
            res.status(400).send({
                message: 'OTP is invalid'
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: 'Failed to verify OTP',
            error
        });
    }
}));
