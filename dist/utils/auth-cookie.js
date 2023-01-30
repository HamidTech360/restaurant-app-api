"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenCookie = exports.parseCookies = exports.removeTokenCookie = exports.setTokenCookie = exports.MAX_AGE = void 0;
const cookie_1 = require("cookie");
const TOKEN_NAME = "token";
exports.MAX_AGE = 60 * 60 * 24 * 7; // 1 week
function setTokenCookie(res, token) {
    const cookie = (0, cookie_1.serialize)(TOKEN_NAME, token, {
        maxAge: exports.MAX_AGE,
        expires: new Date(Date.now() + exports.MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/api/refresh-token",
        sameSite: "strict",
    });
    res.setHeader("Set-Cookie", cookie);
}
exports.setTokenCookie = setTokenCookie;
function removeTokenCookie(res) {
    const cookie = (0, cookie_1.serialize)(TOKEN_NAME, "", {
        maxAge: -1,
        path: "/api/auth/refresh-token",
    });
    res.setHeader("Set-Cookie", cookie);
}
exports.removeTokenCookie = removeTokenCookie;
function parseCookies(req) {
    var _a;
    // For API Routes we don't need to parse the cookies.
    if (req.cookies)
        return req.cookies;
    // For pages we do need to parse the cookies.
    const cookie = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.cookie;
    return (0, cookie_1.parse)(cookie || "");
}
exports.parseCookies = parseCookies;
function getTokenCookie(req) {
    const cookies = parseCookies(req);
    return cookies[TOKEN_NAME];
}
exports.getTokenCookie = getTokenCookie;
