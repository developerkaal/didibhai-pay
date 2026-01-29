import { cn } from "@/lib/utils";

interface CountryFlagProps {
  country: "india" | "nepal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CountryFlag({ country, size = "md", className }: CountryFlagProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const flagEmoji = country === "india" ? "🇮🇳" : "🇳🇵";

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <span className="leading-none">{flagEmoji}</span>
    </div>
  );
}
