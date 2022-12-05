"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentValidator = void 0;
const joi_browser_1 = __importDefault(require("joi-browser"));
function createStudentValidator(student) {
    const schema = {
        firstName: joi_browser_1.default.string().required(),
        lastName: joi_browser_1.default.string().required(),
        gender: joi_browser_1.default.string().required(),
        dob: joi_browser_1.default.string().required(),
        admissionDate: joi_browser_1.default.string().required(),
        address: joi_browser_1.default.string().required(),
        state: joi_browser_1.default.string().required(),
        level: joi_browser_1.default.string().required(),
        parentName: joi_browser_1.default.string().required(),
        parentAddress: joi_browser_1.default.string().required(),
        phoneNumber: joi_browser_1.default.string().required()
    };
    return joi_browser_1.default.validate(student, schema);
}
exports.createStudentValidator = createStudentValidator;
