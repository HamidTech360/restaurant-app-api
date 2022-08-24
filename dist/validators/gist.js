"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGist = void 0;
const joi_browser_1 = __importDefault(require("joi-browser"));
const validateGist = (payload) => {
    const schema = {
        title: joi_browser_1.default.string().required(),
        post: joi_browser_1.default.string().required(),
        country: joi_browser_1.default.string(),
        category: joi_browser_1.default.string()
    };
    return joi_browser_1.default.validate(payload, schema);
};
exports.validateGist = validateGist;
