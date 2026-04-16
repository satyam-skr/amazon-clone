import { apiClient } from "@/api/client";
import type { Cart, ApiSuccessResponse } from "@/api/types";

export async function fetchCart(): Promise<Cart> {
  const res = await apiClient.get<ApiSuccessResponse<Cart>>("/cart");
  return res.data;
}

export async function addToCart(productId: string, quantity: number): Promise<Cart> {
  const res = await apiClient.post<ApiSuccessResponse<Cart>>("/cart/add", { productId, quantity });
  return res.data;
}

export async function updateCartItem(productId: string, quantity: number): Promise<Cart> {
  const res = await apiClient.patch<ApiSuccessResponse<Cart>>("/cart/update", { productId, quantity });
  return res.data;
}

export async function removeFromCart(productId: string): Promise<Cart> {
  const res = await apiClient.delete<ApiSuccessResponse<Cart>>("/cart/remove", { productId });
  return res.data;
}
