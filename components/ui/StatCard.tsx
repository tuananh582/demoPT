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
    ? "rounded-2xl border border-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 text-white shadow-lg"
    : "rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100";
  const labelClass = isAccent ? "text-sm font-medium text-white/80" : "text-sm font-medium text-zinc-500 dark:text-zinc-400";
  const descriptionClass = isAccent ? "mt-2 text-sm text-white/90" : "mt-2 text-sm text-zinc-500 dark:text-zinc-400";

  return (
    <div className={containerClass}>
      <p className={labelClass}>{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      {description ? <p className={descriptionClass}>{description}</p> : null}
    </div>
  );
}
