import type { Product, ProductCategory, PaginatedProducts, ApiSuccessResponse } from "@/api/types";
import { apiClient } from "@/api/client";

/**
 * Returns all products.
 */
export async function getProducts(): Promise<Product[]> {
  const res = await apiClient.get<ApiSuccessResponse<PaginatedProducts>>("/products?limit=100");
  return res.data.items;
}

/**
 * Returns a single product by ID, or undefined if not found.
 */
export async function getProductById(
  id: string
): Promise<Product | undefined> {
  try {
    const res = await apiClient.get<ApiSuccessResponse<Product>>(`/products/${id}`);
    return res.data;
  } catch {
    return undefined;
  }
}

/**
 * Full-text search across title and category.
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return getProducts();

  const res = await apiClient.get<ApiSuccessResponse<PaginatedProducts>>(`/products?search=${encodeURIComponent(q)}&limit=100`);
  return res.data.items;
}

/**
 * Filters products by category.
 */
export async function filterByCategory(
  category: ProductCategory
): Promise<Product[]> {
  const res = await apiClient.get<ApiSuccessResponse<PaginatedProducts>>(`/products?categoryId=${encodeURIComponent(category)}&limit=100`);
  return res.data.items;
}
