import Link from "next/link";
import { Star } from "lucide-react";

interface RatingStarsProps {
  average?: number;
  count?: number;
  size?: "sm" | "md";
}

export function RatingStars({ average = 0, count = 0, size = "sm" }: RatingStarsProps) {
  const iconSize = size === "md" ? "size-5" : "size-[14px]";
  const textSize = size === "md" ? "text-sm" : "text-xs";
  const safeAverage = Number.isFinite(average) ? average : 0;
  const safeCount = Number.isFinite(count) ? count : 0;
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(safeAverage);
          const half = !filled && i < safeAverage;
          return (
            <Star
              key={i}
              className={`${iconSize} ${
                filled
                  ? "fill-amazon-star text-amazon-star"
                  : half
                    ? "fill-amazon-star/50 text-amazon-star"
                    : "fill-none text-[#D5D9D9]"
              }`}
            />
          );
        })}
      </div>
      <Link
        href="/"
        className={`${textSize} text-amazon-teal hover:text-amazon-link-hover hover:underline`}
      >
        {size === "md"
          ? safeCount.toLocaleString("en-IN") + " ratings"
          : safeCount.toLocaleString("en-IN")}
      </Link>
    </div>
  );
}
