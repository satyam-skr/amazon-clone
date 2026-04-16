"use client";

import { useEffect, useState } from "react";
import { Container, Button } from "@/ui";
import { ProductCard } from "@/features/products";
import { useUIStore } from "@/lib/store";
import type { Product, ProductCategory } from "@/api/types";
import { CATEGORY_LABELS } from "@/api/types";
import { getProducts } from "@/api";

const allCategories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const searchQuery = useUIStore((s) => s.searchQuery);
  const selectedCategory = useUIStore((s) => s.selectedCategory);
  const setSelectedCategory = useUIStore((s) => s.setSelectedCategory);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    getProducts({
      search: searchQuery.trim() || undefined,
      categoryId: selectedCategory ?? undefined,
    })
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("We couldn't load products. Please try again.");
          setProducts([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [searchQuery, selectedCategory, reloadKey]);

  return (
    <div className="bg-background py-4">
      <Container>
        <div className="flex gap-4">
          {/* ── Sidebar Filters ────────────────── */}
          <aside className="hidden w-[220px] shrink-0 md:block">
            <div className="sticky top-[100px] space-y-4">
              {/* Category filter */}
              <div className="rounded-sm border border-[#D5D9D9] bg-white p-3">
                <h3 className="mb-2 text-sm font-bold text-[#0F1111]">
                  Category
                </h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                        !selectedCategory
                          ? "bg-[#EDFDFF] font-bold text-amazon-teal"
                          : "text-[#0F1111] hover:bg-[#F0F2F2]"
                      }`}
                    >
                      All Categories
                    </button>
                  </li>
                  {allCategories.map(([key, label]) => (
                    <li key={key}>
                      <button
                        onClick={() => setSelectedCategory(key)}
                        className={`w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                          selectedCategory === key
                            ? "bg-[#EDFDFF] font-bold text-amazon-teal"
                            : "text-[#0F1111] hover:bg-[#F0F2F2]"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating filter placeholder */}
              <div className="rounded-sm border border-[#D5D9D9] bg-white p-3">
                <h3 className="mb-2 text-sm font-bold text-[#0F1111]">
                  Customer Review
                </h3>
                <p className="text-xs text-muted-foreground">
                  4★ &amp; above
                </p>
              </div>

              {/* Price filter placeholder */}
              <div className="rounded-sm border border-[#D5D9D9] bg-white p-3">
                <h3 className="mb-2 text-sm font-bold text-[#0F1111]">
                  Price
                </h3>
                <ul className="space-y-1 text-sm text-[#0F1111]">
                  <li className="cursor-pointer hover:text-amazon-link-hover">Under ₹500</li>
                  <li className="cursor-pointer hover:text-amazon-link-hover">₹500 – ₹1,000</li>
                  <li className="cursor-pointer hover:text-amazon-link-hover">₹1,000 – ₹5,000</li>
                  <li className="cursor-pointer hover:text-amazon-link-hover">Over ₹5,000</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* ── Main Content ───────────────────── */}
          <div className="min-w-0 flex-1">
            {/* Results header */}
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-sm text-[#565959]">
                  {loading
                    ? "Loading..."
                    : error
                      ? "Unable to load results"
                    : `1–${products.length} of ${products.length} results`}
                </span>
                {(searchQuery || selectedCategory) && (
                  <span className="ml-2 text-sm text-[#0F1111]">
                    {searchQuery && (
                      <>
                        for &quot;<strong>{searchQuery}</strong>&quot;
                      </>
                    )}
                    {selectedCategory && (
                      <> in <strong>{CATEGORY_LABELS[selectedCategory]}</strong></>
                    )}
                  </span>
                )}
              </div>

              {/* Mobile category filter */}
              <select
                value={selectedCategory ?? ""}
                onChange={(e) =>
                  setSelectedCategory(
                    (e.target.value as ProductCategory) || null
                  )
                }
                className="h-[31px] rounded-md border border-[#D5D9D9] bg-[#F0F2F2] px-2 text-sm text-[#0F1111] shadow-amz-btn lg:hidden"
              >
                <option value="">All Categories</option>
                {allCategories.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Product grid */}
            {loading ? (
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[420px] animate-pulse rounded-sm border border-[#D5D9D9] bg-white"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center rounded-sm border border-[#D5D9D9] bg-white px-4 py-20 shadow-amz-card">
                <p className="text-xl font-medium text-[#0F1111]">
                  Something went wrong.
                </p>
                <p className="mt-2 text-center text-sm text-[#565959]">
                  {error}
                </p>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => setReloadKey((k) => k + 1)}
                >
                  Try Again
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-sm border border-[#D5D9D9] bg-white px-4 py-24 shadow-amz-card">
                <span className="mb-3 text-4xl">🔍</span>
                <p className="text-xl font-medium text-[#0F1111]">
                  No results found.
                </p>
                <p className="mt-2 text-center text-sm text-[#565959]">
                  Try checking your spelling or use more general terms.
                </p>
              </div>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
