"use client";

import Link from "next/link";
import { Container } from "@/ui";
import { useUIStore } from "@/lib/store";
import type { ProductCategory } from "@/api/types";

const categories = [
  "All",
  "Fresh",
  "MX Player",
  "Sell",
  "Best Sellers",
  "Today's Deals",
  "Mobiles",
  "Electronics",
  "Fashion",
  "Prime",
  "Home & Kitchen",
  "New Releases",
  "Customer Service",
] as const;

const categoryMap: Partial<Record<(typeof categories)[number], ProductCategory>> = {
  Electronics: "electronics",
  Fashion: "fashion",
  "Home & Kitchen": "home",
};

export function SubNav() {
  const setSelectedCategory = useUIStore((s) => s.setSelectedCategory);

  return (
    <nav className="bg-amazon-navy-light text-white">
      <Container className="relative">
        <div className="scrollbar-none flex items-center gap-0.5 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat}
              href="/"
              onClick={() => {
                if (cat === "All") {
                  setSelectedCategory(null);
                  return;
                }
                setSelectedCategory(categoryMap[cat] ?? null);
              }}
              className="shrink-0 whitespace-nowrap border border-transparent px-2 py-[6px] text-sm leading-tight hover:border-white hover:no-underline"
            >
              {cat}
            </Link>
          ))}
        </div>
      </Container>
    </nav>
  );
}
