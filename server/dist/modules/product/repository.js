"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = getProductById;
exports.getProducts = getProducts;
const prisma_1 = require("../../db/prisma");
async function getProductById(id) {
    const product = await prisma_1.prisma.product.findUnique({
        where: { id },
        include: { category: true },
    });
    if (!product)
        return null;
    return {
        ...product,
        category: product.category?.name || "electronics",
        rating: { average: product.ratingAverage, count: product.ratingCount },
    };
}
async function getProducts(query) {
    const { search, categoryId, page, limit } = query;
    const skip = (page - 1) * limit;
    const where = {
        ...(search
            ? {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            }
            : {}),
        ...(categoryId ? { category: { name: categoryId } } : {}),
    };
    const [items, total] = await Promise.all([
        prisma_1.prisma.product.findMany({
            where,
            include: { category: true },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma_1.prisma.product.count({ where }),
    ]);
    return {
        items: items.map((product) => ({
            ...product,
            category: product.category?.name || "electronics",
            rating: { average: product.ratingAverage, count: product.ratingCount },
        })),
        total,
        page,
        limit,
    };
}
