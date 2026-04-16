"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProductsQuerySchema = exports.productIdParamSchema = void 0;
const zod_1 = require("zod");
exports.productIdParamSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
exports.listProductsQuerySchema = zod_1.z.object({
    search: zod_1.z.string().trim().optional(),
    categoryId: zod_1.z.string().trim().optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
});
