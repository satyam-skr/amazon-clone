import { z } from "zod";

export const orderIdParamSchema = z.object({
  id: z.string().min(1),
});

export const guestIdHeaderSchema = z.object({
  "x-guest-id": z.string().trim().min(1),
});

export const createOrderSchema = z.object({
  paymentMethod: z.enum(["COD", "CARD", "UPI", "NET_BANKING"]),
  shippingAddress: z.any().optional(),
});
