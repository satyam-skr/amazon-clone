"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ApiError_1 = require("../utils/ApiError");
const validate = (schema, source) => (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
        return next(new ApiError_1.ApiError(400, "Validation failed", result.error.flatten()));
    }
    req[source] = result.data;
    return next();
};
exports.validate = validate;
