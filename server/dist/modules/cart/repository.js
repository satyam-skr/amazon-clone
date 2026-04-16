"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartByGuestId = getCartByGuestId;
exports.getProductById = getProductById;
exports.getCartItem = getCartItem;
exports.upsertCartItem = upsertCartItem;
exports.deleteCartItem = deleteCartItem;
exports.getCartById = getCartById;
const prisma_1 = require("../../db/prisma");
async function ensureGuestUser(guestId) {
    return prisma_1.prisma.user.upsert({
        where: { id: guestId },
        create: {
            id: guestId,
            email: `${guestId}@guest.local`,
            name: "Guest",
        },
        update: {},
    });
}
async function getCartByGuestId(guestId) {
    await ensureGuestUser(guestId);
    return prisma_1.prisma.cart.upsert({
        where: { userId: guestId },
        create: { userId: guestId },
        update: {},
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
}
async function getProductById(productId) {
    return prisma_1.prisma.product.findUnique({
        where: { id: productId },
    });
}
async function getCartItem(cartId, productId) {
    return prisma_1.prisma.cartItem.findUnique({
        where: {
            cartId_productId: { cartId, productId },
        },
    });
}
async function upsertCartItem(cartId, productId, quantity) {
    return prisma_1.prisma.cartItem.upsert({
        where: {
            cartId_productId: { cartId, productId },
        },
        create: {
            cartId,
            productId,
            quantity,
        },
        update: {
            quantity,
        },
    });
}
async function deleteCartItem(cartId, productId) {
    return prisma_1.prisma.cartItem.deleteMany({
        where: { cartId, productId },
    });
}
async function getCartById(id) {
    return prisma_1.prisma.cart.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
}
