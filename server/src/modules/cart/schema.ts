import { z } from "zod";

export const guestIdHeaderSchema = z.object({
  "x-guest-id": z.string().trim().min(1),
});

export const addCartItemSchema = z.object({
  productId: z.string().trim().min(1),
  quantity: z.coerce.number().int().positive(),
});

export const updateCartItemSchema = z.object({
  productId: z.string().trim().min(1),
  quantity: z.coerce.number().int().positive(),
});

export const removeCartItemSchema = z.object({
  productId: z.string().trim().min(1),
});
