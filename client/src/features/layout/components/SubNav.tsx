"use client";

import { Container } from "@/ui";

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

export function SubNav() {
  return (
    <nav className="bg-amazon-navy-light text-white">
      <Container className="relative">
        <div className="scrollbar-none flex items-center gap-0.5 overflow-x-auto">
          {categories.map((cat) => (
            <a
              key={cat}
              href="#"
              className="shrink-0 whitespace-nowrap border border-transparent px-2 py-[6px] text-sm leading-tight hover:border-white hover:no-underline"
            >
              {cat}
            </a>
          ))}
        </div>
      </Container>
    </nav>
  );
}
