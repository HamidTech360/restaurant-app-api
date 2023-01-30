"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccessToken = exports.setAccessToken = exports.getAccessToken = void 0;
let accessToken = "";
const getAccessToken = () => accessToken;
exports.getAccessToken = getAccessToken;
const setAccessToken = (token) => {
    accessToken = token;
};
exports.setAccessToken = setAccessToken;
const removeAccessToken = () => {
    accessToken = "";
};
exports.removeAccessToken = removeAccessToken;
