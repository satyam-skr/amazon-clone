"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./modules/product/route"));
const route_2 = __importDefault(require("./modules/cart/route"));
const route_3 = __importDefault(require("./modules/order/route"));
const error_middleware_1 = require("./middlewares/error.middleware");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const app = (0, express_1.default)();
const apiV1 = "/api/v1";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_middleware_1.loggerMiddleware);
app.get("/health", (_req, res) => {
    return res.status(200).send("OK");
});
app.use(`${apiV1}/products`, route_1.default);
app.use(`${apiV1}/cart`, route_2.default);
app.use(`${apiV1}/orders`, route_3.default);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
