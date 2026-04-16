"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCartItemSchema = exports.updateCartItemSchema = exports.addCartItemSchema = exports.guestIdHeaderSchema = void 0;
const zod_1 = require("zod");
exports.guestIdHeaderSchema = zod_1.z.object({
    "x-guest-id": zod_1.z.string().trim().min(1),
});
exports.addCartItemSchema = zod_1.z.object({
    productId: zod_1.z.string().trim().min(1),
    quantity: zod_1.z.coerce.number().int().positive(),
});
exports.updateCartItemSchema = zod_1.z.object({
    productId: zod_1.z.string().trim().min(1),
    quantity: zod_1.z.coerce.number().int().positive(),
});
exports.removeCartItemSchema = zod_1.z.object({
    productId: zod_1.z.string().trim().min(1),
});
