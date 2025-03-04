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
exports.fetchSingleUser = exports.fetchUsersCount = exports.fetchUsers = exports.registerUser = void 0;
const service_1 = require("./service");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = req.body;
        const user = yield (0, service_1.saveUser)(userPayload);
        res
            .status(user.statusCode)
            .json({ message: user.message, data: user.data });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const fetchUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const users = yield (0, service_1.getUsers)(pageNumber, pageSize);
        res.status(users.statusCode).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.fetchUsers = fetchUsers;
const fetchUsersCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield (0, service_1.getUsersCount)();
        res
            .status(200)
            .json({ message: "User count fetched successfully", data: count });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchUsersCount = fetchUsersCount;
const fetchSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield (0, service_1.getUserById)(id);
        res
            .status(user.statusCode)
            .json({ message: user.message, data: user.data });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.fetchSingleUser = fetchSingleUser;
