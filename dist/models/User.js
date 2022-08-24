"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    otherNames: {
        type: String,
    },
    images: {
        type: new mongoose_1.Schema({
            avatar: String,
            cover: String,
        }),
    },
    password: {
        type: String,
        min: 8,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    gender: {
        type: String,
    },
    fullAddress: {
        type: String
    },
    address: {
        type: new mongoose_1.Schema({
            city: {
                type: String,
            },
            country: {
                type: Number,
                default: 0,
            },
            location: {
                type: mongoose_1.Schema.Types.Mixed,
            },
        }),
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    confirmationCode: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    followers: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "User",
    },
    bookmarks: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Feed",
    },
    following: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "User",
    },
    bio: {
        type: String,
    },
    username: {
        type: String
    },
    authProvider: {
        type: String,
        default: "LOCAL",
    },
    notificationOptions: {
        type: [String]
    },
    interests: {
        type: String
    },
    dob: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    websites: {
        type: String
    }
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
userSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
userSchema.index({ "$**": "text" });
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = User;
