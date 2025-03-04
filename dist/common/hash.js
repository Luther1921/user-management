"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchChecker = exports.hasher = void 0;
const bcrypt = require("bcryptjs");
const hasher = (value, salt) => bcrypt.hash(value, salt);
exports.hasher = hasher;
const matchChecker = (value, dbValue) => {
    let compare = bcrypt.compare(value, dbValue);
    return compare;
};
exports.matchChecker = matchChecker;
