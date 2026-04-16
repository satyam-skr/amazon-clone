"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/api/types";
import { Button } from "@/ui";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "./RatingStars";

interface ProductCardProps {
  product: Product;
}


export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    if (adding) return;
    setAddError(null);
    setAdding(true);
    try {
      await addToCart(product);
    } catch {
      setAddError("Unable to add this item right now.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-[#D5D9D9] bg-white transition-shadow duration-200 hover:shadow-amz-card-hover">
      {/* ── Image ──────────────────────────────── */}
      <Link href={`/product/${product.id}`} className="relative block overflow-hidden bg-[#F7F7F7] p-4">
        {product.badge && (
          <span className="absolute left-0 top-3 z-10 rounded-r-sm bg-amazon-error px-2 py-0.5 text-xs font-bold text-white">
            {product.badge}
          </span>
        )}
        <div className="relative mx-auto aspect-square w-full max-w-[200px]">
          <Image
            src={`https://placehold.co/300x300/F0F2F2/565959?text=${encodeURIComponent(product.title.split(" ").slice(0, 2).join("+"))}`}
            alt={product.title}
            fill
            sizes="200px"
            className="object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* ── Details ────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        {/* Title */}
        <Link
          href={`/product/${product.id}`}
          className="line-clamp-2 text-sm leading-snug text-[#0F1111] hover:text-amazon-link-hover"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <RatingStars average={product.rating.average} count={product.rating.count} />

        {/* Price */}
        <div className="mt-1 flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-[12px] text-[#0F1111]">₹</span>
            <span className="text-xl font-medium text-[#0F1111]">
              {formatPrice(product.price)}
            </span>
          </div>

          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                M.R.P.: <span className="line-through">₹{formatPrice(product.originalPrice)}</span>
              </span>
              {discount > 0 && (
                <span className="text-xs font-medium text-amazon-error">
                  ({discount}% off)
                </span>
              )}
            </div>
          )}
        </div>

        {/* Stock */}
        {product.stock === 0 ? (
          <span className="text-xs text-amazon-error font-medium">Out of stock</span>
        ) : product.stock <= 10 ? (
          <span className="text-xs text-amazon-error">
            Only {product.stock} left in stock.
          </span>
        ) : (
          <span className="text-xs text-amazon-success">In stock</span>
        )}

        {/* Free delivery */}
        <span className="mt-0.5 text-xs text-[#565959]">
          FREE Delivery by <strong className="text-[#0F1111]">Amazon</strong>
        </span>
      </div>

      {/* ── Add to Cart ────────────────────────── */}
      <div className="px-3 pb-3">
        <Button
          variant="primary"
          size="default"
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0 || adding}
        >
          {product.stock === 0 ? "Out of Stock" : adding ? "Adding..." : "Add to Cart"}
        </Button>
        {addError && (
          <p className="mt-1 text-xs text-amazon-error">{addError}</p>
        )}
      </div>
    </div>
  );
}
