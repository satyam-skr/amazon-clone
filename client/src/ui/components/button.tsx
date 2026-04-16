import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Amazon-styled Button
 *
 * Variants:
 *   primary  — Yellow gradient (Add to Cart, Buy Now)
 *   secondary — Orange gradient (Buy Now accent)
 *   outline  — White w/ gray border (generic action)
 *   ghost    — No border, hover bg
 *   link     — Teal text, underline on hover
 *   destructive — Red warning
 *
 * Sizes:  xs | sm | default | lg | icon
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md text-sm font-medium select-none",
    "transition-all duration-100 ease-in-out active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amazon-orange focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-b from-amazon-yellow to-[#F0C14B]",
          "border border-[#A88734]",
          "text-[#0F1111]",
          "shadow-amz-btn",
          "hover:from-[#F7CA00] hover:to-[#E8B01A]",
          "active:from-[#E8B31A] active:to-[#D9A215] active:shadow-none",
        ].join(" "),
        secondary: [
          "bg-gradient-to-b from-amazon-orange to-[#E47911]",
          "border border-[#A16B17]",
          "text-white",
          "shadow-amz-btn",
          "hover:from-[#FA8900] hover:to-[#D06E10]",
          "active:from-[#D06E10] active:to-[#B75E0C] active:shadow-none",
        ].join(" "),
        outline: [
          "bg-white border border-[#D5D9D9]",
          "text-[#0F1111]",
          "shadow-amz-btn",
          "hover:bg-[#F7FAFA]",
          "active:bg-[#EDFDFF] active:border-[#007185] active:shadow-none",
        ].join(" "),
        ghost: [
          "text-[#0F1111]",
          "hover:bg-[#F0F2F2]",
          "active:bg-[#E3E6E6]",
        ].join(" "),
        destructive: [
          "bg-amazon-error/10 text-amazon-error",
          "border border-amazon-error/30",
          "hover:bg-amazon-error/20",
          "active:bg-amazon-error/30",
        ].join(" "),
        link: [
          "text-amazon-teal underline-offset-2",
          "hover:text-amazon-link-hover hover:underline",
          "p-0 h-auto",
        ].join(" "),
      },
      size: {
        xs: "h-6 px-2 text-xs rounded-sm",
        sm: "h-7 px-3 text-xs rounded-sm",
        default: "h-[31px] px-3 text-[13px] rounded-md",
        lg: "h-9 px-4 text-sm rounded-md",
        icon: "size-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
