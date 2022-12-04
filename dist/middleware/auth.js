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
exports.loggedIn = void 0;
const user_1 = require("../models/user");
const get_userID_1 = __importDefault(require("../utils/get-userID"));
//to add : Proper user interface
const loggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const user = yield user_1.User.findById((0, get_userID_1.default)(token)).select("-password");
            if (!user) {
                res.status(401).json("Unauthorized");
            }
            req.user = user;
            //console.log(req.user);
            next();
        }
        catch (error) {
            res.status(401).send('unauthorized');
            throw new Error("Unauthorized");
        }
    }
    else {
        res.status(401).send('Invalid token format');
    }
});
exports.loggedIn = loggedIn;
