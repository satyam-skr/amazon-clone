import Link from "next/link";
import { Button } from "@/ui";
import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
}

export function OrderSummary({ itemCount, subtotal }: OrderSummaryProps) {
  return (
    <div className="w-full shrink-0 rounded-sm border border-[#D5D9D9] bg-white p-5 shadow-amz-card lg:sticky lg:top-[110px] lg:w-[300px]">
      {/* Free delivery notice */}
      <div className="mb-3 flex items-start gap-2 rounded-sm bg-[#F0F2F2] p-3">
        <span className="text-sm text-amazon-success">✓</span>
        <p className="text-sm text-[#0F1111]">
          Your order is eligible for{" "}
          <strong className="text-amazon-success">FREE Delivery</strong>.
          <br />
          <span className="text-xs text-[#565959]">
            Select this option at checkout.
          </span>
        </p>
      </div>

      {/* Subtotal */}
      <p className="text-lg text-[#0F1111]">
        Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
        <span className="font-bold">₹{formatPrice(subtotal)}</span>
      </p>

      {/* Gift option */}
      <label className="mt-3 flex items-center gap-2 text-sm text-[#0F1111]">
        <input type="checkbox" className="size-4 accent-amazon-teal" />
        This order contains a gift
      </label>

      {/* Checkout button */}
      <Link href="/checkout">
        <Button
          variant="primary"
          className="mt-4 w-full rounded-lg"
          size="lg"
        >
          Proceed to Checkout ({itemCount} {itemCount === 1 ? "item" : "items"})
        </Button>
      </Link>

      {/* EMI notice */}
      <p className="mt-3 text-xs text-[#565959]">
        EMI Available.{" "}
        <Link
          href="/"
          className="text-amazon-teal hover:text-amazon-link-hover hover:underline"
        >
          Learn more
        </Link>
      </p>
    </div>
  );
}
