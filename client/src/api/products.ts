import type { Product, ProductCategory, PaginatedProducts, ApiSuccessResponse } from "@/api/types";
import { apiClient } from "@/api/client";

interface ProductQueryOptions {
  search?: string;
  categoryId?: ProductCategory;
  limit?: number;
}

/**
 * Returns all products.
 */
export async function getProducts(options: ProductQueryOptions = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  params.set("limit", String(options.limit ?? 100));

  if (options.search?.trim()) {
    params.set("search", options.search.trim());
  }

  if (options.categoryId) {
    params.set("categoryId", options.categoryId);
  }

  const res = await apiClient.get<ApiSuccessResponse<PaginatedProducts>>(`/products?${params.toString()}`);
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
  } catch (error) {
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? (error as { status?: unknown }).status
        : undefined;

    if (status === 404) {
      return undefined;
    }
    throw error;
  }
}

/**
 * Full-text search across title and category.
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return getProducts();

  return getProducts({ search: q });
}

/**
 * Filters products by category.
 */
export async function filterByCategory(
  category: ProductCategory
): Promise<Product[]> {
  return getProducts({ categoryId: category });
}
