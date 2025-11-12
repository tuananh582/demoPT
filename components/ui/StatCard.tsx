"use client";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  variant?: "default" | "accent";
}

export function StatCard({ label, value, description, variant = "default" }: StatCardProps) {
  const isAccent = variant === "accent";
  const containerClass = isAccent
    ? "rounded-xl border border-zinc-900 bg-zinc-900 p-4 text-white dark:border-white dark:bg-white dark:text-zinc-900"
    : "rounded-xl border border-zinc-200 bg-white p-4 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";
  const labelClass = isAccent ? "text-sm font-medium text-white/70" : "text-sm font-medium text-zinc-600 dark:text-zinc-300";
  const descriptionClass = isAccent ? "mt-2 text-sm text-white/80" : "mt-2 text-sm text-zinc-600 dark:text-zinc-300";

  return (
    <div className={containerClass}>
      <p className={labelClass}>{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      {description ? <p className={descriptionClass}>{description}</p> : null}
    </div>
  );
}
