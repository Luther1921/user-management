"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestError_1 = require("../utils/requestError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof requestError_1.CustomError) {
        res.status(err.statusCode).json(err.serializeErrors());
    }
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
};
exports.default = errorHandler;
