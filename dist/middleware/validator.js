"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validator = (schema) => {
    return (req, res, next) => {
        const isValidPayload = schema(req.body);
        if (isValidPayload === true) {
            next();
        }
        else {
            res.status(400).json({ error: isValidPayload[0].message });
        }
    };
};
exports.validator = validator;
