import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Amazon-styled Card
 *
 * White panel with subtle border and soft shadow.
 * Matches amazon.in product cards and content panels.
 */
function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        [
          "flex flex-col overflow-hidden",
          "rounded-lg bg-card text-card-foreground",
          "border border-[#D5D9D9]",
          "shadow-amz-card",
          "transition-shadow duration-200",
          "hover:shadow-amz-card-hover",
        ].join(" "),
        className
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1 p-4", className)}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-md font-heading font-bold leading-tight text-[#0F1111]",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 pb-4", className)}
      {...props}
    />
  );
}

function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t border-[#D5D9D9] bg-[#F0F2F2] px-4 py-3",
        className
      )}
      {...props}
    />
  );
}

function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto self-start", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
