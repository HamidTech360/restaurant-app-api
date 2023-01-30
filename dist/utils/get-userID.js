"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const getUserID = (token) => {
    // if(!token)  throw new Error('No token provided')
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || "");
        return payload.sub;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return null;
        }
    }
};
exports.default = getUserID;
