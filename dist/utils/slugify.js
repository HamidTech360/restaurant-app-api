"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const slugify = (text) => text.toLowerCase().split(" ").join("-");
exports.slugify = slugify;
