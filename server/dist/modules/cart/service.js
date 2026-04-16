"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCartByGuestId = fetchCartByGuestId;
exports.addToCart = addToCart;
exports.updateCartItem = updateCartItem;
exports.removeFromCart = removeFromCart;
const ApiError_1 = require("../../utils/ApiError");
const repository_1 = require("./repository");
function assertCartExists(cart) {
    if (!cart) {
        throw new ApiError_1.ApiError(404, "Cart not found");
    }
    return cart;
}
function withSubtotal(cart) {
    const subtotal = cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
    return { ...cart, subtotal };
}
async function fetchCartByGuestId(guestId) {
    const cart = await (0, repository_1.getCartByGuestId)(guestId);
    return withSubtotal(cart);
}
async function addToCart(guestId, input) {
    const cart = await (0, repository_1.getCartByGuestId)(guestId);
    const product = await (0, repository_1.getProductById)(input.productId);
    if (!product) {
        throw new ApiError_1.ApiError(404, "Product not found");
    }
    const existingItem = cart.items.find((item) => item.productId === input.productId);
    const nextQuantity = (existingItem?.quantity ?? 0) + input.quantity;
    if (nextQuantity > product.stock) {
        throw new ApiError_1.ApiError(400, "Insufficient stock");
    }
    await (0, repository_1.upsertCartItem)(cart.id, input.productId, nextQuantity);
    const updatedCart = assertCartExists(await (0, repository_1.getCartById)(cart.id));
    return withSubtotal(updatedCart);
}
async function updateCartItem(guestId, input) {
    const cart = await (0, repository_1.getCartByGuestId)(guestId);
    const product = await (0, repository_1.getProductById)(input.productId);
    if (!product) {
        throw new ApiError_1.ApiError(404, "Product not found");
    }
    if (input.quantity > product.stock) {
        throw new ApiError_1.ApiError(400, "Insufficient stock");
    }
    const existingItem = cart.items.find((item) => item.productId === input.productId);
    if (!existingItem) {
        throw new ApiError_1.ApiError(404, "Cart item not found");
    }
    await (0, repository_1.upsertCartItem)(cart.id, input.productId, input.quantity);
    const updatedCart = assertCartExists(await (0, repository_1.getCartById)(cart.id));
    return withSubtotal(updatedCart);
}
async function removeFromCart(guestId, productId) {
    const cart = await (0, repository_1.getCartByGuestId)(guestId);
    await (0, repository_1.deleteCartItem)(cart.id, productId);
    const updatedCart = assertCartExists(await (0, repository_1.getCartById)(cart.id));
    return withSubtotal(updatedCart);
}
