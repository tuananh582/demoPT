"use client";

interface MicroBarChartProps {
  labels: string[];
  values: number[];
}

export function MicroBarChart({ labels, values }: MicroBarChartProps) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex w-full items-end gap-2">
      {values.map((value, index) => {
        const heightPercent = Math.round((value / max) * 100);
        return (
          <div key={labels[index]} className="flex-1 text-center text-xs text-zinc-500">
            <div className="mx-auto flex h-32 w-full max-w-[28px] items-end rounded-full border border-zinc-200 bg-zinc-50 p-1">
              <div
                className="w-full rounded-full bg-zinc-900 transition-all"
                style={{ height: `${heightPercent}%` }}
                aria-hidden
              />
            </div>
            <span className="mt-2 block font-medium text-zinc-600">{labels[index]}</span>
          </div>
        );
      })}
    </div>
  );
}
