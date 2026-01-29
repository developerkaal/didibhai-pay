import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, Loader2, XCircle } from "lucide-react";

export type TransactionStatus = 
  | "initiated" 
  | "payment_pending" 
  | "paid" 
  | "payout_processing" 
  | "completed" 
  | "failed";

interface StatusBadgeProps {
  status: TransactionStatus;
  className?: string;
}

const statusConfig: Record<TransactionStatus, { 
  label: string; 
  icon: React.ComponentType<{ className?: string }>; 
  className: string;
}> = {
  initiated: {
    label: "Initiated",
    icon: Clock,
    className: "bg-muted text-muted-foreground",
  },
  payment_pending: {
    label: "Payment Pending",
    icon: Clock,
    className: "bg-warning/10 text-warning",
  },
  paid: {
    label: "Paid",
    icon: CheckCircle2,
    className: "bg-success/10 text-success",
  },
  payout_processing: {
    label: "Processing Payout",
    icon: Loader2,
    className: "bg-accent/10 text-accent",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-success/10 text-success",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
        config.className,
        className
      )}
    >
      <Icon className={cn("w-3.5 h-3.5", status === "payout_processing" && "animate-spin")} />
      <span>{config.label}</span>
    </span>
  );
}
