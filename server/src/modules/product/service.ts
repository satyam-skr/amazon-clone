import { ApiError } from "../../utils/ApiError";
import { ListProductsQuery } from "./schema";
import { getProductById, getProducts } from "./repository";

export async function fetchProductById(id: string) {
  const product = await getProductById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
}

export async function fetchProducts(query: ListProductsQuery) {
  return getProducts(query);
}
