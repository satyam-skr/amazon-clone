import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

/**
 * Amazon-styled Input
 *
 * Matches the amazon.in search/form field style:
 * tight padding, 1px solid border, orange focus ring.
 */
function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        [
          /* Base */
          "flex h-[31px] w-full min-w-0 rounded-md",
          "border border-[#A6A6A6] bg-white",
          "px-2 py-1 text-[13px] text-[#0F1111]",
          "shadow-[0_1px_2px_rgba(15,17,17,.15)_inset]",
          "transition-colors duration-100",

          /* Placeholder */
          "placeholder:text-[#565959]",

          /* Focus — Amazon orange glow */
          "focus-visible:outline-none",
          "focus-visible:border-amazon-orange",
          "focus-visible:ring-[3px] focus-visible:ring-amazon-orange/30",
          "focus-visible:shadow-[0_0_0_1px_#e77600]",

          /* File input */
          "file:inline-flex file:h-6 file:border-0 file:bg-transparent",
          "file:text-sm file:font-medium file:text-foreground",

          /* Disabled */
          "disabled:pointer-events-none disabled:cursor-not-allowed",
          "disabled:bg-[#F0F2F2] disabled:opacity-60",

          /* Error */
          "aria-invalid:border-amazon-error",
          "aria-invalid:ring-[3px] aria-invalid:ring-amazon-error/20",
        ].join(" "),
        className
      )}
      {...props}
    />
  );
}

export { Input };
