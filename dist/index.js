"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./lib/db"));
const cors_1 = __importDefault(require("cors"));
//route imports
const auth_1 = __importDefault(require("./routes/auth"));
const student_1 = __importDefault(require("./routes/student"));
//dotenv config
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//connectDB
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use("/api/auth", auth_1.default);
app.use("/api/student", student_1.default);
app.get("/", (res) => res.send("Hello"));
app.listen(process.env.PORT, () => console.log(`Express app running on ${process.env.PORT}`));
