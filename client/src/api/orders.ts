import { apiClient } from "@/api/client";
import type { Order, ApiSuccessResponse, ShippingAddress } from "@/api/types";

export async function createOrder(shippingAddress: ShippingAddress, paymentMethod: string): Promise<Order> {
  const res = await apiClient.post<ApiSuccessResponse<Order>>("/orders", { shippingAddress, paymentMethod });
  return res.data;
}

export async function getOrder(id: string): Promise<Order> {
  const res = await apiClient.get<ApiSuccessResponse<Order>>(`/orders/${id}`);
  return res.data;
}
