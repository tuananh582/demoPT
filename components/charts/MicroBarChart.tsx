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
            <div className="mx-auto flex h-32 w-full max-w-[28px] items-end rounded-full bg-zinc-100 p-1 dark:bg-zinc-800">
              <div
                className="w-full rounded-full bg-indigo-500 transition-all dark:bg-indigo-400"
                style={{ height: `${heightPercent}%` }}
                aria-hidden
              />
            </div>
            <span className="mt-2 block font-medium text-zinc-500 dark:text-zinc-400">{labels[index]}</span>
          </div>
        );
      })}
    </div>
  );
}
