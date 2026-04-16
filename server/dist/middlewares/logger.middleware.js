"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = loggerMiddleware;
function loggerMiddleware(req, res, next) {
    const start = Date.now();
    res.on("finish", () => {
        const responseTimeMs = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${responseTimeMs}ms`);
    });
    next();
}
