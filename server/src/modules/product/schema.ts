import { z } from "zod";

export const productIdParamSchema = z.object({
  id: z.string().min(1),
});

export const listProductsQuerySchema = z.object({
  search: z.string().trim().optional(),
  categoryId: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;
