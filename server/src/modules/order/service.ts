import { PaymentMethod } from "@prisma/client";
import { ApiError } from "../../utils/ApiError";
import { createOrderFromCart, getOrderById } from "./repository";

export async function fetchOrderById(id: string, userId: string) {
  const order = await getOrderById(id, userId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
}

export async function placeOrder(userId: string, paymentMethod: PaymentMethod, shippingAddress?: any) {
  return createOrderFromCart(userId, paymentMethod, shippingAddress);
}
