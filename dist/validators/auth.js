"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.createUserValidator = void 0;
const joi_browser_1 = __importDefault(require("joi-browser"));
function createUserValidator(user) {
    const schema = {
        password: joi_browser_1.default.string().required(),
        email: joi_browser_1.default.string().email().required(),
        username: joi_browser_1.default.string().required()
    };
    return joi_browser_1.default.validate(user, schema);
}
exports.createUserValidator = createUserValidator;
function loginValidator(user) {
    const schema = {
        password: joi_browser_1.default.string().required(),
        email: joi_browser_1.default.string().email().required()
    };
    return joi_browser_1.default.validate(user, schema);
}
exports.loginValidator = loginValidator;
