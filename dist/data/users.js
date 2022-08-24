"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users = [
    {
        firstName: "John",
        lastName: "Barnes",
        password: bcryptjs_1.default.hashSync("password"),
        gender: "male",
        status: "active",
        email: "ohenesetwumasi@gmail.com",
        avatar: `/images/friends/${Math.floor(Math.random() * 12) + 2}.png`,
        following: [],
        followers: [],
    },
    {
        firstName: "Stella",
        lastName: "Oseyomon",
        password: bcryptjs_1.default.hashSync("password"),
        gender: "female",
        status: "active",
        email: "stellaoseyomon1@gmail.com",
        avatar: `/images/friends/${Math.floor(Math.random() * 12) + 2}.png`,
        following: [],
        followers: [],
    },
];
exports.default = users;
