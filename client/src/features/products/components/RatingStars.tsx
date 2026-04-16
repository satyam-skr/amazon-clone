import { Star } from "lucide-react";

interface RatingStarsProps {
  average: number;
  count: number;
  size?: "sm" | "md";
}

export function RatingStars({ average, count, size = "sm" }: RatingStarsProps) {
  const iconSize = size === "md" ? "size-5" : "size-[14px]";
  const textSize = size === "md" ? "text-sm" : "text-xs";
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(average);
          const half = !filled && i < average;
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
      <a
        href="#"
        className={`${textSize} text-amazon-teal hover:text-amazon-link-hover hover:underline`}
      >
        {size === "md" ? count.toLocaleString("en-IN") + " ratings" : count.toLocaleString("en-IN")}
      </a>
    </div>
  );
}
