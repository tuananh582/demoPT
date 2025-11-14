"use client";

type StatCardTone = "subtle" | "graphite" | "indigo" | "emerald" | "amber" | "fuchsia" | "sky";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  tone?: StatCardTone;
}

const toneMap: Record<
  StatCardTone,
  {
    container: string;
    label: string;
    value: string;
    description: string;
  }
> = {
  subtle: {
    container: "rounded-2xl border border-zinc-200/80 bg-white/90 p-4 text-zinc-900 shadow-sm",
    label: "text-xs font-semibold uppercase tracking-wide text-zinc-400",
    value: "text-2xl font-semibold text-zinc-900",
    description: "mt-2 text-sm text-zinc-500",
  },
  graphite: {
    container: "rounded-2xl border border-zinc-900 bg-zinc-950 p-4 text-white shadow-lg shadow-zinc-900/40",
    label: "text-xs font-semibold uppercase tracking-wide text-white/60",
    value: "text-2xl font-semibold text-white",
    description: "mt-2 text-sm text-white/80",
  },
  indigo: {
    container: "rounded-2xl border border-indigo-500/50 bg-gradient-to-br from-indigo-600 to-indigo-800 p-4 text-white shadow-md shadow-indigo-500/40",
    label: "text-xs font-semibold uppercase tracking-wide text-indigo-100/80",
    value: "text-2xl font-semibold text-white",
    description: "mt-2 text-sm text-indigo-100/80",
  },
  emerald: {
    container: "rounded-2xl border border-emerald-400/60 bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 text-white shadow-md shadow-emerald-400/40",
    label: "text-xs font-semibold uppercase tracking-wide text-emerald-100/80",
    value: "text-2xl font-semibold text-white",
    description: "mt-2 text-sm text-emerald-100/80",
  },
  amber: {
    container: "rounded-2xl border border-amber-400/70 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-4 text-zinc-900 shadow-md shadow-amber-400/40",
    label: "text-xs font-semibold uppercase tracking-wide text-amber-100/90",
    value: "text-2xl font-semibold text-zinc-900",
    description: "mt-2 text-sm text-amber-50/90",
  },
  fuchsia: {
    container: "rounded-2xl border border-fuchsia-400/70 bg-gradient-to-br from-fuchsia-500 to-pink-600 p-4 text-white shadow-md shadow-fuchsia-400/40",
    label: "text-xs font-semibold uppercase tracking-wide text-fuchsia-100/80",
    value: "text-2xl font-semibold text-white",
    description: "mt-2 text-sm text-fuchsia-100/80",
  },
  sky: {
    container: "rounded-2xl border border-sky-400/70 bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500 p-4 text-white shadow-md shadow-sky-300/50",
    label: "text-xs font-semibold uppercase tracking-wide text-sky-100/80",
    value: "text-2xl font-semibold text-white",
    description: "mt-2 text-sm text-sky-100/80",
  },
};

export function StatCard({ label, value, description, tone = "subtle" }: StatCardProps) {
  const toneStyle = toneMap[tone] ?? toneMap.subtle;

  return (
    <div className={toneStyle.container}>
      <p className={toneStyle.label}>{label}</p>
      <p className={`mt-3 ${toneStyle.value}`}>{value}</p>
      {description ? <p className={toneStyle.description}>{description}</p> : null}
    </div>
  );
}
