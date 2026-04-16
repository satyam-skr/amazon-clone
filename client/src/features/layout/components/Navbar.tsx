"use client";

import Link from "next/link";
import { Container } from "@/ui";
import { useUIStore } from "@/lib/store";
import { useCartStore } from "@/lib/store";
import { MapPin, Search, ShoppingCart, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchQuery = useUIStore((s) => s.searchQuery);
  const setSearchQuery = useUIStore((s) => s.setSearchQuery);
  const totalItems = useCartStore((s) => s.totalItems);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // search is reactive via zustand — no submit needed
  };

  return (
    <header className="sticky top-0 z-50">
      {/* ── Main Nav ──────────────────────────────── */}
      <div className="bg-amazon-navy">
        <Container className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2 py-2 sm:h-[60px] sm:flex-nowrap sm:justify-start sm:gap-4 sm:py-0">
          {/* Mobile menu toggle */}
          <button
            className="flex items-center p-1 text-white lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="size-6" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center border border-transparent px-2 py-1.5 hover:border-white hover:no-underline"
          >
            <span className="text-xl font-bold tracking-tight text-white">
              amazon
              <span className="text-amazon-orange">.in</span>
            </span>
          </Link>

          {/* Location selector */}
          <button className="hidden shrink-0 items-center gap-0.5 border border-transparent px-2 py-1.5 text-white hover:border-white md:flex">
            <MapPin className="size-5 shrink-0 text-white" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-2xs text-[#CCCCCC]">Deliver to</span>
              <span className="text-sm font-bold">India</span>
            </div>
          </button>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="order-last flex w-full min-w-0 items-stretch sm:order-none sm:w-auto sm:flex-1"
          >
            <select
              className="hidden rounded-l-md border-0 bg-[#E6E6E6] px-2 text-xs text-[#555] focus:outline-none lg:block"
              defaultValue="all"
            >
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
              <option value="home">Home &amp; Kitchen</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
              <option value="toys">Toys &amp; Games</option>
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon.in"
              className="h-[40px] min-w-0 flex-1 border-0 bg-white px-3 text-[15px] text-[#0F1111] placeholder:text-[#8D9096] focus:outline-none lg:rounded-l-none"
              style={{ borderRadius: "0" }}
            />

            <button
              type="submit"
              className="flex shrink-0 items-center justify-center rounded-r-md bg-amazon-orange px-3 hover:bg-amazon-orange-hover"
              aria-label="Search"
            >
              <Search className="size-5 text-[#0F1111]" />
            </button>
          </form>

          {/* Right nav items */}
          <div className="hidden shrink-0 items-center gap-1 lg:flex">
            <Link
              href="/"
              className="flex flex-col border border-transparent px-2 py-1.5 leading-tight text-white hover:border-white hover:no-underline"
            >
              <span className="text-2xs text-[#CCCCCC]">Hello, sign in</span>
              <span className="flex items-center text-sm font-bold">
                Account &amp; Lists
                <ChevronDown className="ml-0.5 size-3" />
              </span>
            </Link>

            <Link
              href="/order-success"
              className="flex flex-col border border-transparent px-2 py-1.5 leading-tight text-white hover:border-white hover:no-underline"
            >
              <span className="text-2xs text-[#CCCCCC]">Returns</span>
              <span className="text-sm font-bold">&amp; Orders</span>
            </Link>
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex shrink-0 items-end gap-0.5 border border-transparent px-2 py-1.5 text-white hover:border-white hover:no-underline"
          >
            <div className="relative">
              <ShoppingCart className="size-7" />
              <span className="absolute -right-1.5 -top-1 flex size-5 items-center justify-center rounded-full bg-amazon-orange text-xs font-bold text-[#0F1111]">
                {totalItems()}
              </span>
            </div>
            <span className="hidden text-sm font-bold sm:inline">Cart</span>
          </Link>
        </Container>
      </div>

      {/* ── Mobile menu ────────────────────────── */}
      {mobileMenuOpen && (
        <div className="border-t border-amazon-navy-mid bg-amazon-navy-light lg:hidden">
          <Container className="flex flex-col gap-2 py-3 text-sm text-white">
            <Link href="/" className="rounded px-3 py-2 hover:bg-amazon-navy-mid hover:no-underline">
              Account &amp; Lists
            </Link>
            <Link href="/order-success" className="rounded px-3 py-2 hover:bg-amazon-navy-mid hover:no-underline">
              Returns &amp; Orders
            </Link>
            <button className="flex items-center gap-2 rounded px-3 py-2 text-left hover:bg-amazon-navy-mid">
              <MapPin className="size-4" />
              Deliver to India
            </button>
          </Container>
        </div>
      )}
    </header>
  );
}
