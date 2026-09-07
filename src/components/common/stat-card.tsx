import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgClass?: string;
  iconColorClass?: string;
  trendValue?: string;
  trendLabel?: string;
  trendUp?: boolean;
  alertText?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconBgClass = "bg-primary/10",
  iconColorClass = "text-primary",
  trendValue,
  trendLabel,
  trendUp,
  alertText,
}: StatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100/50 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-500">{title}</span>
          <span className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </span>
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconBgClass, iconColorClass)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {(trendValue || alertText) && (
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          {trendValue && (
            <span
              className={cn(
                "flex items-center font-medium",
                trendUp !== undefined
                  ? trendUp
                    ? "text-emerald-600"
                    : "text-red-600"
                  : "text-slate-700 dark:text-slate-300"
              )}
            >
              {trendUp ? "+" : ""}{trendValue}
            </span>
          )}
          {alertText && (
            <span className="font-medium text-amber-600">{alertText}</span>
          )}
          {trendLabel && <span>{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
