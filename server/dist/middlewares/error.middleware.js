"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
function errorMiddleware(error, _req, res, _next) {
    if (error instanceof ApiError_1.ApiError) {
        return res
            .status(error.statusCode)
            .json(ApiResponse_1.apiResponse.error(error.message, error.details));
    }
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return res.status(500).json(ApiResponse_1.apiResponse.error(message));
}
