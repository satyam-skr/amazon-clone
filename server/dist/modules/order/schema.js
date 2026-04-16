"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = exports.guestIdHeaderSchema = exports.orderIdParamSchema = void 0;
const zod_1 = require("zod");
exports.orderIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
exports.guestIdHeaderSchema = zod_1.z.object({
    "x-guest-id": zod_1.z.string().trim().min(1),
});
exports.createOrderSchema = zod_1.z.object({
    paymentMethod: zod_1.z.enum(["COD", "CARD", "UPI", "NET_BANKING"]),
    shippingAddress: zod_1.z.any().optional(),
});
