import { ApiError } from "../../utils/ApiError";
import {
  deleteCartItem,
  getCartByGuestId,
  getCartById,
  getProductById,
  upsertCartItem,
} from "./repository";

type CartItemInput = {
  productId: string;
  quantity: number;
};

function assertCartExists<T>(cart: T | null): T {
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  return cart;
}

function withSubtotal<T extends { items: Array<{ quantity: number; product: { price: number } }> }>(
  cart: T
) {
  const subtotal = cart.items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  return { ...cart, subtotal };
}

export async function fetchCartByGuestId(guestId: string) {
  const cart = await getCartByGuestId(guestId);
  return withSubtotal(cart);
}

export async function addToCart(guestId: string, input: CartItemInput) {
  const cart = await getCartByGuestId(guestId);
  const product = await getProductById(input.productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const existingItem = cart.items.find((item) => item.productId === input.productId);
  const nextQuantity = (existingItem?.quantity ?? 0) + input.quantity;

  if (nextQuantity > product.stock) {
    throw new ApiError(400, "Insufficient stock");
  }

  await upsertCartItem(cart.id, input.productId, nextQuantity);
  const updatedCart = assertCartExists(await getCartById(cart.id));

  return withSubtotal(updatedCart);
}

export async function updateCartItem(guestId: string, input: CartItemInput) {
  const cart = await getCartByGuestId(guestId);
  const product = await getProductById(input.productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (input.quantity > product.stock) {
    throw new ApiError(400, "Insufficient stock");
  }

  const existingItem = cart.items.find((item) => item.productId === input.productId);

  if (!existingItem) {
    throw new ApiError(404, "Cart item not found");
  }

  await upsertCartItem(cart.id, input.productId, input.quantity);
  const updatedCart = assertCartExists(await getCartById(cart.id));

  return withSubtotal(updatedCart);
}

export async function removeFromCart(guestId: string, productId: string) {
  const cart = await getCartByGuestId(guestId);
  await deleteCartItem(cart.id, productId);
  const updatedCart = assertCartExists(await getCartById(cart.id));

  return withSubtotal(updatedCart);
}
