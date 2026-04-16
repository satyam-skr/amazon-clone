"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = getOrderById;
exports.createOrderFromCart = createOrderFromCart;
const prisma_1 = require("../../db/prisma");
const ApiError_1 = require("../../utils/ApiError");
async function getOrderById(id, userId) {
    const order = await prisma_1.prisma.order.findFirst({
        where: { id, userId },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
    if (!order)
        return null;
    const subtotal = order.items.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);
    return {
        ...order,
        status: order.status.toLowerCase(),
        subtotal,
        total: subtotal,
        items: order.items.map(item => ({
            ...item,
            title: item.productTitleSnapshot,
        })),
    };
}
async function createOrderFromCart(userId, paymentMethod, shippingAddress) {
    return prisma_1.prisma.$transaction(async (tx) => {
        await tx.user.upsert({
            where: { id: userId },
            create: {
                id: userId,
                email: `${userId}@guest.local`,
                name: "Guest",
            },
            update: {},
        });
        const cart = await tx.cart.upsert({
            where: { userId },
            create: { userId },
            update: {},
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (cart.items.length === 0) {
            throw new ApiError_1.ApiError(400, "Cart is empty");
        }
        const lockedCartItems = await tx.cartItem.deleteMany({
            where: {
                cartId: cart.id,
            },
        });
        if (lockedCartItems.count === 0) {
            throw new ApiError_1.ApiError(400, "Cart is empty or already processed");
        }
        for (const item of cart.items) {
            const updated = await tx.product.updateMany({
                where: {
                    id: item.productId,
                    stock: { gte: item.quantity },
                },
                data: {
                    stock: { decrement: item.quantity },
                },
            });
            if (updated.count === 0) {
                throw new ApiError_1.ApiError(400, `Insufficient stock for ${item.product.title}`);
            }
        }
        const order = await tx.order.create({
            data: {
                userId,
                paymentMethod,
                shippingAddress: shippingAddress ?? undefined,
                status: "CONFIRMED",
                items: {
                    create: cart.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        priceAtPurchase: item.product.price,
                        productTitleSnapshot: item.product.title,
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        const subtotal = order.items.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);
        return {
            ...order,
            status: order.status.toLowerCase(),
            subtotal,
            total: subtotal,
            items: order.items.map(item => ({
                ...item,
                title: item.productTitleSnapshot,
            })),
        };
    });
}
