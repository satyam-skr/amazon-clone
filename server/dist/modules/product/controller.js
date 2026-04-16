"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsController = exports.getProductController = void 0;
const ApiResponse_1 = require("../../utils/ApiResponse");
const asyncHandler_1 = require("../../utils/asyncHandler");
const service_1 = require("./service");
const schema_1 = require("./schema");
exports.getProductController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = schema_1.productIdParamSchema.parse(req.params);
    const product = await (0, service_1.fetchProductById)(id);
    return res
        .status(200)
        .json(ApiResponse_1.apiResponse.success("Product fetched successfully", product));
});
exports.getProductsController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const query = schema_1.listProductsQuerySchema.parse(req.query);
    const result = await (0, service_1.fetchProducts)(query);
    return res
        .status(200)
        .json(ApiResponse_1.apiResponse.success("Products fetched successfully", result));
});
