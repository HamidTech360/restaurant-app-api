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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SEC, "https://developers.google.com/oauthplayground");
    oauth2Client.setCredentials({
        refresh_token: process.env.MAIL_REF,
    });
    const accessToken = yield new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject("Failed to create access token :(");
            }
            resolve(token);
        });
    });
    const transporter = nodemailer_1.default.createTransport({
        //@ts-ignore
        service: "gmail",
        auth: {
            serviceClient: "gmail",
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SEC,
            refreshToken: process.env.MAIL_REF,
        },
    });
    return transporter;
});
const sendMail = (email, message, subject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transport = yield createTransporter();
        transport.sendMail({
            from: process.env.MAILER,
            to: email,
            subject: subject,
            html: message,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMail = sendMail;
