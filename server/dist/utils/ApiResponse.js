"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
exports.apiResponse = {
    success(message, data) {
        return {
            success: true,
            message,
            data,
        };
    },
    error(message, error) {
        return {
            success: false,
            message,
            error,
        };
    },
};
