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
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeFacebookData = exports.normalizeGoogleData = void 0;
const normalizeGoogleData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name,
        avatar: data.picture || null,
        authProvider: "GOOGLE",
    };
});
exports.normalizeGoogleData = normalizeGoogleData;
const normalizeFacebookData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        fullName: data.name,
        authProvider: String(data.graphDomain).toUpperCase(),
        email: data.email,
    };
});
exports.normalizeFacebookData = normalizeFacebookData;
