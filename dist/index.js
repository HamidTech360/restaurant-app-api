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
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const group_1 = __importDefault(require("./routes/group"));
const post_1 = __importDefault(require("./routes/post"));
const gist_1 = __importDefault(require("./routes/gist"));
const comment_1 = __importDefault(require("./routes/comment"));
const feed_1 = __importDefault(require("./routes/feed"));
const like_1 = __importDefault(require("./routes/like"));
const bookmark_1 = __importDefault(require("./routes/bookmark"));
const search_1 = __importDefault(require("./routes/search"));
const chat_1 = __importDefault(require("./routes/chat"));
const category_1 = __importDefault(require("./routes/category"));
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
app.use("/api/search", search_1.default);
app.use("/api/users", user_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/groups", group_1.default);
app.use("/api/posts", post_1.default);
app.use("/api/gists", gist_1.default);
app.use("/api/comments", comment_1.default);
app.use("/api/feed", feed_1.default);
app.use("/api/likes", like_1.default);
app.use("/api/bookmarks", bookmark_1.default);
app.use("/api/chats", chat_1.default);
app.use("/api/category", category_1.default);
app.get("/", (res) => res.send("Hello"));
app.listen(process.env.PORT, () => console.log(`Express app running on ${process.env.PORT}`));
