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
exports.removePost = exports.fetchPost = exports.addPost = void 0;
const service_1 = require("./service");
const addPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postPayload = req.body;
        const post = yield (0, service_1.createPost)(postPayload);
        res
            .status(post.statusCode)
            .json({ message: post.message, data: post.data });
    }
    catch (error) {
        next(error);
    }
});
exports.addPost = addPost;
const fetchPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.query.userId);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
        }
        const post = yield (0, service_1.getPost)(userId);
        res
            .status(post.statusCode)
            .json({ message: post.message, data: post.data });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchPost = fetchPost;
const removePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const post = yield (0, service_1.deletePost)(id);
        res.status(post.statusCode).json({ message: post.message });
    }
    catch (error) {
        next(error);
    }
});
exports.removePost = removePost;
