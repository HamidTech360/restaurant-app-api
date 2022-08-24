"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./lib/db"));
//import fileUpload from 'express-fileupload'
const cors_1 = __importDefault(require("cors"));
//route imports
// import usersRoute from "./routes/user";
//dotenv config
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//connectDB
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//app.use(fileUpload({
//limits: { fileSize: 50 * 1024 * 1024 },
//}));
//app.use("/api/search", searchRoutes);
app.get("/", (res) => res.send("Hello"));
app.listen(process.env.PORT, () => console.log(`Express app running on ${process.env.PORT}`));
