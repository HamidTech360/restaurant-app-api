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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./data/users"));
const gists_1 = __importDefault(require("./data/gists"));
const posts_1 = __importDefault(require("./data/posts"));
const feed_1 = __importDefault(require("./data/feed"));
const User_1 = __importDefault(require("./models/User"));
const Post_1 = __importDefault(require("./models/Post"));
const db_1 = __importDefault(require("./lib/db"));
const Gist_1 = __importDefault(require("./models/Gist"));
const Feed_1 = __importDefault(require("./models/Feed"));
dotenv_1.default.config();
(0, db_1.default)();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Post_1.default.deleteMany();
        yield User_1.default.deleteMany();
        yield Gist_1.default.deleteMany();
        yield Feed_1.default.deleteMany();
        const createdUsers = yield User_1.default.insertMany(users_1.default);
        const adminUser = createdUsers[0]._id;
        const samplePosts = posts_1.default.map((post) => {
            return Object.assign(Object.assign({}, post), { author: adminUser });
        });
        const sampleGists = gists_1.default.map((post) => {
            return Object.assign(Object.assign({}, post), { author: adminUser });
        });
        const sampleFeed = feed_1.default.map((feat) => {
            return Object.assign(Object.assign({}, feat), { author: adminUser });
        });
        yield Gist_1.default.insertMany(sampleGists);
        yield Post_1.default.insertMany(samplePosts);
        yield Feed_1.default.insertMany(sampleFeed);
        console.log("Data Imported!");
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
});
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Post_1.default.deleteMany();
        yield User_1.default.deleteMany();
        console.log("Data Destroyed!");
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
});
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}
