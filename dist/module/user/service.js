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
exports.getUserById = exports.getUsersCount = exports.getUsers = exports.saveUser = void 0;
const client_1 = require("@prisma/client");
const requestError_1 = require("../../utils/requestError");
const hash_1 = require("../../common/hash");
const prisma = new client_1.PrismaClient();
const saveUser = (userPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield prisma.user.findUnique({
            where: { email: userPayload.email },
        });
        if (checkUser) {
            throw new requestError_1.BadRequest("User with this email already exists");
        }
        const cryptedPassword = yield (0, hash_1.hasher)(userPayload.password, 12);
        const user = yield prisma.user.create({
            data: {
                fullName: userPayload.fullName,
                email: userPayload.email.toLowerCase(),
                password: cryptedPassword,
                phoneNumber: userPayload.phoneNumber,
            },
        });
        if (!user) {
            throw new requestError_1.BadRequest("Error occured while creating user");
        }
        const response = {
            message: "User created successfully",
            data: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
            statusCode: 201,
        };
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.saveUser = saveUser;
const getUsers = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (pageNumber = 1, pageSize = 10) {
    try {
        const skip = (pageNumber - 1) * pageSize;
        // Fetch users with pagination
        const users = yield prisma.user.findMany({
            skip,
            take: pageSize,
            select: {
                id: true,
                fullName: true,
                email: true,
                phoneNumber: true,
                address: {
                    select: {
                        street: true,
                        city: true,
                        country: true,
                    },
                },
            },
        });
        const response = {
            message: "Users fetched successfully",
            data: users,
            statusCode: 200,
        };
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.getUsers = getUsers;
const getUsersCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield prisma.user.count();
        return { totalUsers };
    }
    catch (error) {
        throw error;
    }
});
exports.getUsersCount = getUsersCount;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                phoneNumber: true,
                address: {
                    select: {
                        street: true,
                        city: true,
                        country: true,
                    },
                },
            },
        });
        if (!user) {
            throw new requestError_1.NotFound("User not found");
        }
        const response = {
            message: "User fetched successfully",
            data: user,
            statusCode: 200,
        };
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserById = getUserById;
