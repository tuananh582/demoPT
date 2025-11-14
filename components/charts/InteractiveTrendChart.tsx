"use client";

import { useId, useMemo, useState } from "react";
import type { CoachMetricPoint } from "@/data/mockData";

interface InteractiveTrendChartProps {
  data: CoachMetricPoint[];
  accentColor?: string;
}

const CHART_WIDTH = 640;
const CHART_HEIGHT = 260;
const PADDING_X = 32;
const PADDING_Y = 24;

export function InteractiveTrendChart({ data, accentColor = "#4f46e5" }: InteractiveTrendChartProps) {
  const gradientId = useId();
  const [windowSize, setWindowSize] = useState(() => Math.min(Math.max(6, data.length - 2), data.length));
  const [windowStart, setWindowStart] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<{ point: CoachMetricPoint; x: number; y: number } | null>(null);

  const minWindowSize = Math.max(1, Math.min(6, data.length));
  const clampedWindowSize = Math.max(minWindowSize, Math.min(windowSize, data.length));
  const maxWindowStart = Math.max(0, data.length - clampedWindowSize);
  const clampedWindowStart = Math.max(0, Math.min(windowStart, maxWindowStart));
  const windowedData = useMemo(
    () => data.slice(clampedWindowStart, clampedWindowStart + clampedWindowSize),
    [clampedWindowSize, clampedWindowStart, data],
  );

  const { points, pathD, areaD, minValue, maxValue } = useMemo(() => {
    if (windowedData.length === 0) {
      return { points: [], pathD: "", areaD: "", minValue: 0, maxValue: 0 };
    }

    const values = windowedData.map((item) => item.value);
    const localMin = Math.min(...values);
    const localMax = Math.max(...values);
    const valueRange = Math.max(localMax - localMin, 1);

    const computedPoints = windowedData.map((point, index) => {
      const ratio = windowedData.length > 1 ? index / (windowedData.length - 1) : 0;
      const x = PADDING_X + ratio * (CHART_WIDTH - PADDING_X * 2);
      const y =
        CHART_HEIGHT -
        PADDING_Y -
        ((point.value - localMin) / valueRange) * (CHART_HEIGHT - PADDING_Y * 2);
      return { point, x, y };
    });

    const linePath = computedPoints.reduce((acc, current, idx) => {
      return idx === 0 ? `M ${current.x} ${current.y}` : `${acc} L ${current.x} ${current.y}`;
    }, "");

    const areaPath =
      computedPoints.length >= 2
        ? `${linePath} L ${computedPoints.at(-1)?.x ?? 0} ${CHART_HEIGHT - PADDING_Y} L ${computedPoints[0].x} ${
            CHART_HEIGHT - PADDING_Y
          } Z`
        : "";

    return {
      points: computedPoints,
      pathD: linePath,
      areaD: areaPath,
      minValue: localMin,
      maxValue: localMax,
    };
  }, [windowedData]);

  const canZoomIn = clampedWindowSize > minWindowSize;
  const canZoomOut = clampedWindowSize < data.length;

  const handleZoomIn = () => {
    setWindowSize((prev) => {
      const next = Math.max(minWindowSize, prev - 2);
      setWindowStart((current) => Math.min(current, Math.max(0, data.length - next)));
      return next;
    });
  };

  const handleZoomOut = () => {
    setWindowSize((prev) => {
      const next = Math.min(data.length, prev + 2);
      setWindowStart((current) => Math.min(current, Math.max(0, data.length - next)));
      return next;
    });
  };

  return (
    <div className="space-y-4 rounded-3xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
      <div className="relative">
        <svg
          role="img"
          aria-label="Biểu đồ xu hướng theo thời gian"
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="h-64 w-full text-indigo-600"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((line) => {
            const y =
              PADDING_Y +
              (line / 3) * (CHART_HEIGHT - PADDING_Y * 2);
            return (
              <line
                key={line}
                x1={PADDING_X}
                x2={CHART_WIDTH - PADDING_X}
                y1={y}
                y2={y}
                stroke="#e4e4e7"
                strokeDasharray="4 6"
              />
            );
          })}
          {areaD ? <path d={areaD} fill={`url(#${gradientId})`} stroke="none" opacity={0.8} /> : null}
          {pathD ? (
            <path
              d={pathD}
              fill="none"
              stroke={accentColor}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          {points.map(({ point, x, y }) => (
            <circle
              key={`${point.date}-${x}`}
              cx={x}
              cy={y}
              r={4}
              className="cursor-pointer"
              fill="#fff"
              stroke={accentColor}
              strokeWidth={2}
              onMouseEnter={() => setHoveredPoint({ point, x, y })}
            />
          ))}
        </svg>
        {hoveredPoint ? (
          <div
            className="pointer-events-none absolute rounded-2xl border border-zinc-200/80 bg-white/95 px-3 py-2 text-xs text-zinc-700 shadow-lg"
            style={{
              left: `calc(${(hoveredPoint.x / CHART_WIDTH) * 100}% - 60px)`,
              top: `calc(${(hoveredPoint.y / CHART_HEIGHT) * 100}% - 48px)`,
            }}
          >
            <p className="font-semibold text-zinc-900">{hoveredPoint.point.label}</p>
            <p className="text-[11px] text-zinc-500">{hoveredPoint.point.date}</p>
            <p className="mt-1 text-sm font-semibold text-indigo-600">{hoveredPoint.point.value} điểm</p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span>Min: {minValue}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-400" />
          <span>Max: {maxValue}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-400" />
          <span>Đang xem {windowedData.length} điểm dữ liệu</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={!canZoomIn}
            className="rounded-xl border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Phóng to
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={!canZoomOut}
            className="rounded-xl border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Thu nhỏ
          </button>
          <input
            type="range"
            min={0}
            max={maxWindowStart}
            value={clampedWindowStart}
            onChange={(event) => setWindowStart(Number(event.target.value))}
            disabled={maxWindowStart === 0}
            className="h-1 flex-1 cursor-pointer rounded-full accent-indigo-600 disabled:cursor-not-allowed lg:w-40"
          />
        </div>
      </div>
    </div>
  );
}
