"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderController = exports.createOrderController = void 0;
const ApiResponse_1 = require("../../utils/ApiResponse");
const asyncHandler_1 = require("../../utils/asyncHandler");
const service_1 = require("./service");
const schema_1 = require("./schema");
exports.createOrderController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { "x-guest-id": guestId } = schema_1.guestIdHeaderSchema.parse(req.headers);
    const { paymentMethod, shippingAddress } = schema_1.createOrderSchema.parse(req.body);
    const order = await (0, service_1.placeOrder)(guestId, paymentMethod, shippingAddress);
    return res
        .status(201)
        .json(ApiResponse_1.apiResponse.success("Order placed successfully", order));
});
exports.getOrderController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { "x-guest-id": guestId } = schema_1.guestIdHeaderSchema.parse(req.headers);
    const { id } = schema_1.orderIdParamSchema.parse(req.params);
    const order = await (0, service_1.fetchOrderById)(id, guestId);
    return res
        .status(200)
        .json(ApiResponse_1.apiResponse.success("Order fetched successfully", order));
});
