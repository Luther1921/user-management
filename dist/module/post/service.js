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
exports.deletePost = exports.getPost = exports.createPost = void 0;
const client_1 = require("@prisma/client");
const requestError_1 = require("../../utils/requestError");
const prisma = new client_1.PrismaClient();
const createPost = (postPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield prisma.user.findUnique({
            where: { id: postPayload.userId },
        });
        if (!checkUser) {
            throw new requestError_1.NotFound(`User with the Id ${postPayload.userId} not found`);
        }
        const checkTitle = yield prisma.post.findFirst({
            where: {
                title: postPayload.title,
                userId: postPayload.userId,
            },
        });
        if (checkTitle) {
            throw new requestError_1.BadRequest(`Post with this title already exists for user with the Id ${postPayload.userId}`);
        }
        const post = yield prisma.post.create({
            data: {
                title: postPayload.title,
                body: postPayload.body,
                user: {
                    connect: { id: postPayload.userId },
                },
            },
        });
        if (!post) {
            throw new requestError_1.BadRequest("Error occured while creating post");
        }
        const resonse = {
            message: "Post created successfully",
            data: post,
            statusCode: 201,
        };
        return resonse;
    }
    catch (error) {
        throw error;
    }
});
exports.createPost = createPost;
const getPost = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkPost = yield prisma.post.findMany({
            where: {
                userId,
            },
        });
        if (checkPost.length === 0) {
            throw new requestError_1.NotFound(`No posts found for  user with ID ${userId}`);
        }
        const resonse = {
            message: "Posts fetched successfully",
            data: checkPost,
            statusCode: 200,
        };
        return resonse;
    }
    catch (error) {
        throw error;
    }
});
exports.getPost = getPost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkPost = yield prisma.post.findUnique({
            where: {
                id,
            },
        });
        if (!checkPost) {
            throw new requestError_1.NotFound(`Post with ID ${id} not found`);
        }
        const remove = yield prisma.post.delete({
            where: {
                id,
            },
        });
        if (!remove) {
            throw new requestError_1.BadRequest("Error occured while trying to delete post");
        }
        const response = {
            message: "Post deleted successfully",
            statusCode: 200,
        };
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.deletePost = deletePost;
