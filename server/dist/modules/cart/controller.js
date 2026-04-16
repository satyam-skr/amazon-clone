"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCartController = exports.updateCartItemController = exports.addToCartController = exports.getCartController = void 0;
const ApiResponse_1 = require("../../utils/ApiResponse");
const asyncHandler_1 = require("../../utils/asyncHandler");
const service_1 = require("./service");
const schema_1 = require("./schema");
exports.getCartController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { "x-guest-id": guestId } = schema_1.guestIdHeaderSchema.parse(req.headers);
    const cart = await (0, service_1.fetchCartByGuestId)(guestId);
    return res.status(200).json(ApiResponse_1.apiResponse.success("Cart fetched successfully", cart));
});
exports.addToCartController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { "x-guest-id": guestId } = schema_1.guestIdHeaderSchema.parse(req.headers);
    const body = schema_1.addCartItemSchema.parse(req.body);
    const cart = await (0, service_1.addToCart)(guestId, body);
    return res.status(200).json(ApiResponse_1.apiResponse.success("Item added to cart", cart));
});
exports.updateCartItemController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { "x-guest-id": guestId } = schema_1.guestIdHeaderSchema.parse(req.headers);
    const body = schema_1.updateCartItemSchema.parse(req.body);
    const cart = await (0, service_1.updateCartItem)(guestId, body);
    return res.status(200).json(ApiResponse_1.apiResponse.success("Cart item updated", cart));
});
exports.removeFromCartController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { "x-guest-id": guestId } = schema_1.guestIdHeaderSchema.parse(req.headers);
    const { productId } = schema_1.removeCartItemSchema.parse(req.body);
    const cart = await (0, service_1.removeFromCart)(guestId, productId);
    return res.status(200).json(ApiResponse_1.apiResponse.success("Item removed from cart", cart));
});
