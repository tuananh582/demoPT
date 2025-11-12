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
    ? "rounded-lg border border-zinc-900 bg-zinc-900 p-4 text-white"
    : "rounded-lg border border-zinc-200 bg-white p-4 text-zinc-900";
  const labelClass = isAccent ? "text-xs font-medium uppercase tracking-wide text-white/70" : "text-xs font-medium uppercase tracking-wide text-zinc-500";
  const descriptionClass = isAccent ? "mt-2 text-sm text-white/80" : "mt-2 text-sm text-zinc-500";

  return (
    <div className={containerClass}>
      <p className={labelClass}>{label}</p>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
      {description ? <p className={descriptionClass}>{description}</p> : null}
    </div>
  );
}
