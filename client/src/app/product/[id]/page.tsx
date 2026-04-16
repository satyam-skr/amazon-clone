"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Container, Button } from "@/ui";
import { useCartStore } from "@/lib/store";
import { getProductById } from "@/api";
import type { Product } from "@/api/types";
import { CATEGORY_LABELS } from "@/api/types";
import { ShieldCheck, Truck, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "@/features/products/components/RatingStars";


export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const addToCart = useCartStore((s) => s.addToCart);

  const handleAddToCart = async () => {
    if (!product || addingToCart || buyingNow) return;
    setActionError(null);
    setAddingToCart(true);
    try {
      await addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      setActionError("Unable to add item to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product || addingToCart || buyingNow) return;
    setActionError(null);
    setBuyingNow(true);
    try {
      await addToCart(product, quantity);
      router.push("/checkout");
    } catch {
      setActionError("Unable to continue to checkout right now.");
      setBuyingNow(false);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      setLoadError(null);
      setProduct(null);
      getProductById(id)
        .then((data) => {
          setProduct(data ?? null);
        })
        .catch(() => {
          setLoadError("We couldn't load this product. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, reloadKey]);

  if (loading) {
    return (
      <div className="bg-background py-6">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_300px]">
            <div className="aspect-square animate-pulse rounded bg-white" />
            <div className="space-y-3">
              <div className="h-6 w-3/4 animate-pulse rounded bg-white" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-white" />
              <div className="h-8 w-1/3 animate-pulse rounded bg-white" />
            </div>
            <div className="h-64 animate-pulse rounded bg-white" />
          </div>
        </Container>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-background py-16">
        <Container className="text-center">
          <h1 className="text-xl font-bold text-[#0F1111]">Something went wrong</h1>
          <p className="mt-2 text-sm text-[#565959]">{loadError}</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => setReloadKey((k) => k + 1)}
          >
            Try Again
          </Button>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background py-16">
        <Container className="text-center">
          <h1 className="text-xl font-bold text-[#0F1111]">Product not found</h1>
          <Link href="/" className="mt-4 inline-block text-sm text-amazon-teal hover:underline">
            ← Back to results
          </Link>
        </Container>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Generate placeholder gallery images
  const images = [
    `https://placehold.co/600x600/F7F7F7/565959?text=${encodeURIComponent(product.title.split(" ").slice(0, 2).join("+"))}`,
    `https://placehold.co/600x600/F0F0F0/565959?text=Side+View`,
    `https://placehold.co/600x600/E8E8E8/565959?text=Detail`,
    `https://placehold.co/600x600/F5F5F5/565959?text=In+Use`,
  ];

  return (
    <div className="bg-white py-4">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1 text-xs text-[#565959]">
          <Link href="/" className="text-amazon-teal hover:text-amazon-link-hover hover:underline">
            Home
          </Link>
          <span>›</span>
          <span className="text-amazon-teal">{CATEGORY_LABELS[product.category as keyof typeof CATEGORY_LABELS] ?? product.category}</span>
          <span>›</span>
          <span className="line-clamp-1">{product.title}</span>
        </nav>

        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap lg:flex-nowrap">
          {/* ── Left: Image Gallery ─────────────── */}
          <div className="w-full space-y-3 md:w-[calc(50%-12px)] lg:w-[420px] lg:shrink-0">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-sm border border-[#D5D9D9] bg-[#F7F7F7]">
              {product.badge && (
                <span className="absolute left-3 top-3 z-10 rounded-sm bg-amazon-error px-2 py-0.5 text-xs font-bold text-white">
                  {product.badge}
                </span>
              )}
              <Image
                src={images[currentImage]}
                alt={product.title}
                fill
                sizes="420px"
                className="object-contain p-6"
              />

              {/* Prev / Next */}
              <button
                onClick={() => setCurrentImage((p) => (p === 0 ? images.length - 1 : p - 1))}
                className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
              >
                <ChevronLeft className="size-5 text-[#0F1111]" />
              </button>
              <button
                onClick={() => setCurrentImage((p) => (p === images.length - 1 ? 0 : p + 1))}
                className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
              >
                <ChevronRight className="size-5 text-[#0F1111]" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative size-16 overflow-hidden rounded-sm border-2 transition-colors ${
                    currentImage === i
                      ? "border-amazon-orange"
                      : "border-[#D5D9D9] hover:border-amazon-teal"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`View ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Center: Product Info ────────────── */}
          <div className="w-full space-y-3 md:w-[calc(50%-12px)] lg:min-w-0 lg:flex-1">
            <h1 className="text-xl font-medium leading-snug text-[#0F1111]">
              {product.title}
            </h1>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-amazon-teal">{product.rating.average}</span>
              <RatingStars average={product.rating.average} count={product.rating.count} size="md" />
            </div>

            <hr className="border-[#E7E7E7]" />

            {/* Price block */}
            <div>
              {discount > 0 && (
                <span className="mr-2 text-2xl font-medium text-amazon-error">
                  -{discount}%
                </span>
              )}
              <span className="text-sm align-super text-[#0F1111]">₹</span>
              <span className="text-[28px] font-medium text-[#0F1111]">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.originalPrice && (
              <p className="text-sm text-[#565959]">
                M.R.P.: <span className="line-through">₹{formatPrice(product.originalPrice)}</span>
              </p>
            )}
            <p className="text-xs text-[#565959]">Inclusive of all taxes</p>

            <hr className="border-[#E7E7E7]" />

            {/* Highlights */}
            {(product.highlights?.length ?? 0) > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-bold text-[#0F1111]">About this item</h3>
                <ul className="list-disc space-y-1 pl-5">
                  {product.highlights!.map((h) => (
                    <li key={h} className="text-sm text-[#333]">{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <hr className="border-[#E7E7E7]" />

            {/* Description */}
            <div>
              <h3 className="mb-2 text-sm font-bold text-[#0F1111]">Product Description</h3>
              <p className="text-sm leading-relaxed text-[#333]">{product.description}</p>
            </div>
          </div>

          {/* ── Right: Buy Box ─────────────────── */}
          <div className="h-fit w-full rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-amz-card lg:sticky lg:top-[110px] lg:w-[280px] lg:shrink-0">
            <div className="space-y-3">
              {/* Price */}
              <div>
                <span className="text-sm text-[#0F1111]">₹</span>
                <span className="text-xl font-medium text-[#0F1111]">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-2 text-sm">
                <Truck className="size-4 text-[#565959]" />
                <span className="text-[#565959]">
                  FREE Delivery <strong className="text-[#0F1111]">Tomorrow</strong>
                </span>
              </div>

              {/* Stock */}
              {product.stock > 10 ? (
                <p className="text-lg font-medium text-amazon-success">In stock</p>
              ) : product.stock > 0 ? (
                <p className="text-lg font-medium text-amazon-error">
                  Only {product.stock} left in stock — order soon.
                </p>
              ) : (
                <p className="text-lg font-medium text-amazon-error">Currently unavailable</p>
              )}

              {/* Quantity */}
              {product.stock > 0 && (
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#0F1111]">Qty:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={addingToCart || buyingNow}
                    className="h-[29px] rounded-md border border-[#D5D9D9] bg-[#F0F2F2] px-2 text-sm shadow-amz-btn"
                  >
                    {Array.from({ length: Math.min(product.stock, 10) }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* CTA Buttons */}
              {product.stock > 0 && (
                <div className="flex flex-col gap-2">
                  <Button
                    variant={added ? "outline" : "primary"}
                    className="w-full rounded-full transition-colors duration-300"
                    onClick={handleAddToCart}
                    disabled={addingToCart || buyingNow}
                  >
                    {addingToCart ? "Adding..." : added ? "✓ Added to Cart" : "Add to Cart"}
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full rounded-full"
                    onClick={handleBuyNow}
                    disabled={addingToCart || buyingNow}
                  >
                    {buyingNow ? "Redirecting..." : "Buy Now"}
                  </Button>
                </div>
              )}

              {actionError && (
                <p className="text-xs text-amazon-error">{actionError}</p>
              )}

              {/* Trust badges */}
              <div className="space-y-2 pt-2 text-xs text-[#565959]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-[#565959]" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="size-4 text-[#565959]" />
                  <span>10 days return policy</span>
                </div>
                <p className="pt-1">
                  Sold by <span className="text-amazon-teal">Amazon</span> and{" "}
                  <span className="text-amazon-teal">Fulfilled by Amazon</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
