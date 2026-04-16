"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, _req, res, _next) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    res.status(500).json({ message });
}
