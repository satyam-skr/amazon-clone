/**
 * src/api/ — Public API surface
 *
 * Usage:
 *   import { getProducts, searchProducts } from "@/api";
 *   import type { Product, ProductCategory } from "@/api";
 */

export { getProducts, getProductById, searchProducts, filterByCategory } from "./products";
export { fetchCart, addToCart, updateCartItem, removeFromCart } from "./cart";
export { createOrder, getOrder } from "./orders";

export type { Product, ProductCategory, Cart, CartItem, Order, OrderItem, ShippingAddress } from "./types";
export { CATEGORY_LABELS } from "./types";
