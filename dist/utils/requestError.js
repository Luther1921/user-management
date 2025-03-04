"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = exports.CustomError = void 0;
// General custom error (abstract class)
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
    // Standardized error response structure
    serializeErrors() {
        return { message: this.message };
    }
}
exports.CustomError = CustomError;
// BadRequest Error (400)
class BadRequest extends CustomError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}
exports.BadRequest = BadRequest;
// Unauthorized Error (401)
class Unauthorized extends CustomError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
exports.Unauthorized = Unauthorized;
// Forbidden Error (403)
class Forbidden extends CustomError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}
exports.Forbidden = Forbidden;
// NotFound Error (404)
class NotFound extends CustomError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
exports.NotFound = NotFound;
