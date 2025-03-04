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
exports.updateAddress = exports.getAddress = exports.createAddress = void 0;
const client_1 = require("@prisma/client");
const requestError_1 = require("../../utils/requestError");
const prisma = new client_1.PrismaClient();
const createAddress = (addressPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield prisma.user.findUnique({
            where: { id: addressPayload.userId },
        });
        if (!checkUser) {
            throw new requestError_1.NotFound(`User with the Id ${addressPayload.userId} not found`);
        }
        const checkAddress = yield prisma.address.findUnique({
            where: {
                userId: addressPayload.userId,
            },
        });
        if (checkAddress) {
            throw new requestError_1.BadRequest(`An address already exists for the user with ID ${addressPayload.userId}`);
        }
        const address = yield prisma.address.create({
            data: {
                street: addressPayload.street,
                city: addressPayload.city,
                country: addressPayload.country,
                user: {
                    connect: { id: addressPayload.userId },
                },
            },
        });
        if (!address) {
            throw new requestError_1.BadRequest("Error occured while creating address");
        }
        const resonse = {
            message: "Address created successfully",
            data: address,
            statusCode: 201,
        };
        return resonse;
    }
    catch (error) {
        throw error;
    }
});
exports.createAddress = createAddress;
const getAddress = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkAddress = yield prisma.address.findUnique({
            where: {
                userId: userId,
            },
        });
        if (!checkAddress) {
            throw new requestError_1.NotFound(`An address doesn't exist for the user with ID ${userId}`);
        }
        const resonse = {
            message: "Address fetched successfully",
            data: checkAddress,
            statusCode: 200,
        };
        return resonse;
    }
    catch (error) {
        throw error;
    }
});
exports.getAddress = getAddress;
const updateAddress = (userId, addressPayolad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkAddress = yield prisma.address.findUnique({
            where: {
                userId: userId,
            },
        });
        if (!checkAddress) {
            throw new requestError_1.NotFound(`An address doesn't exist for the user with ID ${userId}`);
        }
        const update = yield prisma.address.update({
            where: {
                userId,
            },
            data: addressPayolad,
        });
        if (!update) {
            throw new requestError_1.BadRequest("Error occured while updating address");
        }
        const resonse = {
            message: "Address updated successfully",
            data: update,
            statusCode: 200,
        };
        return resonse;
    }
    catch (error) {
        throw error;
    }
});
exports.updateAddress = updateAddress;
