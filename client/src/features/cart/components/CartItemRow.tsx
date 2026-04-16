import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { CartItem } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function CartItemRow({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const { product, quantity } = item;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="flex gap-4 border-b border-[#D5D9D9] py-4 last:border-b-0">
      {/* Image */}
      <Link
        href={`/product/${product.id}`}
        className="relative size-[180px] shrink-0 overflow-hidden rounded-sm bg-[#F7F7F7] max-sm:size-[120px]"
      >
        <Image
          src={`https://placehold.co/300x300/F0F2F2/565959?text=${encodeURIComponent(product.title.split(" ").slice(0, 2).join("+"))}`}
          alt={product.title}
          fill
          sizes="180px"
          className="object-contain p-3"
        />
      </Link>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Title */}
        <Link
          href={`/product/${product.id}`}
          className="line-clamp-2 text-base font-medium leading-snug text-[#0F1111] hover:text-amazon-link-hover"
        >
          {product.title}
        </Link>

        {/* Stock */}
        {product.stock > 0 ? (
          <span className="mt-1 text-xs text-amazon-success">In stock</span>
        ) : (
          <span className="mt-1 text-xs text-amazon-error">Out of stock</span>
        )}

        {/* Badges */}
        <div className="mt-1 flex flex-wrap gap-2">
          <span className="text-xs text-[#565959]">
            Eligible for FREE Shipping
          </span>
          {product.badge && (
            <span className="rounded-sm bg-amazon-error/10 px-1.5 py-0.5 text-2xs font-medium text-amazon-error">
              {product.badge}
            </span>
          )}
        </div>

        {/* Actions row */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {/* Quantity selector */}
          <div className="flex items-center overflow-hidden rounded-md border border-[#D5D9D9] shadow-amz-btn">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex size-8 items-center justify-center bg-[#F0F2F2] text-sm font-bold text-[#0F1111] transition-colors hover:bg-[#E3E6E6]"
            >
              −
            </button>
            <span className="flex h-8 min-w-[40px] items-center justify-center border-x border-[#D5D9D9] bg-white px-2 text-sm font-medium text-[#0F1111]">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= Math.min(product.stock, 10)}
              className="flex size-8 items-center justify-center bg-[#F0F2F2] text-sm font-bold text-[#0F1111] transition-colors hover:bg-[#E3E6E6] disabled:opacity-40"
            >
              +
            </button>
          </div>

          <span className="text-[#D5D9D9]">|</span>

          {/* Delete */}
          <button
            onClick={() => removeFromCart(product.id)}
            className="flex items-center gap-1 text-sm text-amazon-teal hover:text-amazon-link-hover hover:underline"
          >
            <Trash2 className="size-3.5" />
            Delete
          </button>

          <span className="text-[#D5D9D9]">|</span>

          <button className="text-sm text-amazon-teal hover:text-amazon-link-hover hover:underline">
            Save for later
          </button>
        </div>
      </div>

      {/* Price (right) */}
      <div className="shrink-0 text-right">
        <p className="text-lg font-bold text-[#0F1111]">
          ₹{formatPrice(product.price)}
        </p>
        {product.originalPrice && (
          <>
            <p className="text-xs text-[#565959] line-through">
              ₹{formatPrice(product.originalPrice)}
            </p>
            {discount > 0 && (
              <p className="text-xs font-medium text-amazon-error">
                {discount}% off
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
