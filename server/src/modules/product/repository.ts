import { prisma } from "../../db/prisma";
import { ListProductsQuery } from "./schema";

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!product) return null;
  return {
    ...product,
    category: product.category?.name || "electronics",
    rating: { average: product.ratingAverage, count: product.ratingCount },
  };
}

export async function getProducts(query: ListProductsQuery) {
  const { search, categoryId, page, limit } = query;
  const skip = (page - 1) * limit;

  const where = {
    ...(search
      ? {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {}),
    ...(categoryId ? { category: { name: categoryId } } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items: items.map((product) => ({
      ...product,
      category: product.category?.name || "electronics",
      rating: { average: product.ratingAverage, count: product.ratingCount },
    })),
    total,
    page,
    limit,
  };
}
