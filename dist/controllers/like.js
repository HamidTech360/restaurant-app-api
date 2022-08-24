"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveLike = void 0;
const express_async_handler_1 = __importDefault(
  require("express-async-handler")
);
const Gist_1 = __importDefault(require("../models/Gist"));
const Post_1 = __importDefault(require("../models/Post"));
const feed_1 = __importDefault(require("../models/Feed"));
const Comment_1 = __importDefault(require("../models/Comment"));
exports.saveLike = (0, express_async_handler_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { id, type } = req.query;
    console.log(`the post to be liked has the Id ${id}`);
    try {
      if (type == "post") {
        yield Post_1.default
          .findByIdAndUpdate(id, {
            $addToSet: {
              likes:
                (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            },
          })
          .where({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
          });
        res.status(200).json("Liked");
      } else if (type == "gist") {
        yield Gist_1.default
          .findByIdAndUpdate(id, {
            $addToSet: {
              likes:
                (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
            },
          })
          .where({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
          });
        res.status(200).json("Liked");
      } else if (type == "feed") {
        yield feed_1.default
          .findByIdAndUpdate(id, {
            $addToSet: {
              likes:
                (_c = req.user) === null || _c === void 0 ? void 0 : _c._id,
            },
          })
          .where({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
          });
        res.status(200).json("Liked");
      } else if (type == "comment") {
        yield Comment_1.default
          .findByIdAndUpdate(id, {
            $addToSet: {
              likes:
                (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
            },
          })
          .where({
            $or: [{ deleted: { $eq: false } }, { deleted: { $eq: null } }],
          });
        res.status(200).json("Liked");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  })
);
