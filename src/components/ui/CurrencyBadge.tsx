import { cn } from "@/lib/utils";

interface CurrencyBadgeProps {
  currency: "INR" | "NPR";
  className?: string;
}

export function CurrencyBadge({ currency, className }: CurrencyBadgeProps) {
  const isIndia = currency === "INR";
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
        isIndia 
          ? "bg-india/10 text-india" 
          : "bg-nepal/10 text-nepal",
        className
      )}
    >
      <span>{isIndia ? "🇮🇳" : "🇳🇵"}</span>
      <span>{currency}</span>
    </span>
  );
}
