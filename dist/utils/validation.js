"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = exports.validateAddress = exports.validateUser = void 0;
const Validator = require("fastest-validator");
const validate = new Validator();
//user registration
const userSchema = {
    fullName: { type: "string", min: 3, max: 255 },
    email: { type: "email", min: 3, max: 255 },
    password: { type: "string", min: 6 },
    phoneNumber: { type: "string", min: 4, max: 15 },
};
exports.validateUser = validate.compile(userSchema);
// address
const addressSchema = {
    street: { type: "string", min: 3, max: 255 },
    city: { type: "string", min: 2, max: 100 },
    country: { type: "string", min: 2, max: 100 },
    userId: { type: "number" },
};
exports.validateAddress = validate.compile(addressSchema);
// post
const postSchema = {
    title: { type: "string", min: 5, max: 100 },
    body: { type: "string", min: 10 },
    userId: { type: "number" },
};
exports.validatePost = validate.compile(postSchema);
