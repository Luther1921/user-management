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
exports.modifyAddress = exports.fetchAddress = exports.addAddress = void 0;
const service_1 = require("./service");
const addAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressPayload = req.body;
        const address = yield (0, service_1.createAddress)(addressPayload);
        res
            .status(address.statusCode)
            .json({ message: address.message, data: address.data });
    }
    catch (error) {
        next(error);
    }
});
exports.addAddress = addAddress;
const fetchAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const address = yield (0, service_1.getAddress)(userId);
        res
            .status(address.statusCode)
            .json({ message: address.message, data: address.data });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchAddress = fetchAddress;
const modifyAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateAddressPayload = req.body;
        const userId = parseInt(req.params.userId);
        const address = yield (0, service_1.updateAddress)(userId, updateAddressPayload);
        res
            .status(address.statusCode)
            .json({ message: address.message, data: address.data });
    }
    catch (error) {
        next(error);
    }
});
exports.modifyAddress = modifyAddress;
