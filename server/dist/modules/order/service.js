"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOrderById = fetchOrderById;
exports.placeOrder = placeOrder;
const ApiError_1 = require("../../utils/ApiError");
const repository_1 = require("./repository");
async function fetchOrderById(id, userId) {
    const order = await (0, repository_1.getOrderById)(id, userId);
    if (!order) {
        throw new ApiError_1.ApiError(404, "Order not found");
    }
    return order;
}
async function placeOrder(userId, paymentMethod, shippingAddress) {
    return (0, repository_1.createOrderFromCart)(userId, paymentMethod, shippingAddress);
}
