import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Amazon-styled Container
 *
 * Centered content wrapper with responsive padding.
 * Matches amazon.in's max-width behavior.
 *
 * Variants:
 *   default — standard page container (max 1440px)
 *   narrow  — for forms, auth pages (max 480px)
 *   wide    — full-bleed with padding
 */

interface ContainerProps extends React.ComponentProps<"div"> {
  variant?: "default" | "narrow" | "wide";
  as?: React.ElementType;
}

function Container({
  className,
  variant = "default",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      data-slot="container"
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        variant === "default" && "max-w-[1440px]",
        variant === "narrow" && "max-w-[480px]",
        variant === "wide" && "max-w-full",
        className
      )}
      {...props}
    />
  );
}

export { Container };
