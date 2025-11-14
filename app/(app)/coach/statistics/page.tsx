"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { InteractiveTrendChart } from "@/components/charts/InteractiveTrendChart";
import {
  coachActivityFeed,
  coachDisciplineFilters,
  coachMetricSummaries,
  coachPerformanceSeries,
  type CoachDisciplineKey,
  type CoachTimeframeKey,
} from "@/data/mockData";

const analyticsNavItems = [
  { label: "Tổng quan coach", href: "/coach" },
  { label: "Thống kê nâng cao", href: "/coach/statistics" },
];

const timeframeOptions: Array<{ key: CoachTimeframeKey; label: string }> = [
  { key: "month", label: "Tháng này" },
  { key: "quarter", label: "Quý gần nhất" },
  { key: "year", label: "12 tháng" },
];

const disciplineColors: Record<CoachDisciplineKey, string> = {
  strength: "#4338ca",
  conditioning: "#0369a1",
  mobility: "#b45309",
};

export default function CoachStatisticsPage() {
  const [timeframe, setTimeframe] = useState<CoachTimeframeKey>("month");
  const [discipline, setDiscipline] = useState<CoachDisciplineKey>("strength");
  const [selectedMetricId, setSelectedMetricId] = useState(() => coachMetricSummaries[0]?.id ?? "adherence");
  const [feedLimit, setFeedLimit] = useState(6);

  const chartKey = `${timeframe}-${discipline}`;
  const chartData = useMemo(() => coachPerformanceSeries[timeframe][discipline], [timeframe, discipline]);
  const selectedMetric =
    coachMetricSummaries.find((metric) => metric.id === selectedMetricId) ?? coachMetricSummaries[0];
  const visibleFeed = coachActivityFeed.slice(0, feedLimit);
  const canLoadMoreFeed = feedLimit < coachActivityFeed.length;

  return (
    <AppShell title="Thống kê Coach" navItems={analyticsNavItems} roleGuard="coach">
      <div className="space-y-10">
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Phân tích chi tiết</p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-zinc-900">Hiệu suất huấn luyện nâng cao</h1>
              <p className="mt-2 text-sm text-zinc-500">
                Theo dõi xu hướng theo thời gian, lọc theo bộ môn và đào sâu các chỉ số quan trọng.
              </p>
            </div>
            <Link
              href="/coach"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
            >
              Quay về tổng quan
            </Link>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {coachMetricSummaries.map((metric) => (
            <StatCard key={metric.id} label={metric.label} value={metric.value} description={metric.change} tone={metric.tone} />
          ))}
        </div>

        <SectionCard
          title="Biểu đồ tương tác"
          description="Phóng to, thu nhỏ và rê chuột để xem điểm dữ liệu cụ thể theo từng bộ môn."
          actions={
            <div className="flex flex-wrap items-center gap-2">
              {timeframeOptions.map((option) => {
                const isActive = option.key === timeframe;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setTimeframe(option.key)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      isActive ? "bg-zinc-900 text-white shadow" : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            {coachDisciplineFilters.map((filter) => {
              const isActive = filter.key === discipline;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setDiscipline(filter.key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                    isActive ? "bg-indigo-600 text-white shadow" : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <InteractiveTrendChart key={chartKey} data={chartData} accentColor={disciplineColors[discipline]} />
        </SectionCard>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <SectionCard
            title="Phân tích từng chỉ số"
            description="Chọn chỉ số để xem các highlight và gợi ý tối ưu cụ thể."
          >
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {coachMetricSummaries.map((metric) => {
                  const isSelected = selectedMetric?.id === metric.id;
                  return (
                    <div
                      key={metric.id}
                      className={`rounded-3xl border p-4 transition ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-50/70 shadow"
                          : "border-zinc-200 bg-white hover:border-indigo-200"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-zinc-500">
                        <span>{metric.label}</span>
                        <span className="font-semibold text-emerald-600">{metric.change}</span>
                      </div>
                      <p className="mt-2 text-3xl font-semibold text-zinc-900">{metric.value}</p>
                      <button
                        type="button"
                        onClick={() => setSelectedMetricId(metric.id)}
                        className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  );
                })}
              </div>

              {selectedMetric ? (
                <div className="flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Chi tiết</p>
                    <h3 className="mt-2 text-xl font-semibold text-zinc-900">{selectedMetric.label}</h3>
                    <p className="text-sm text-zinc-500">Giá trị hiện tại: {selectedMetric.value}</p>
                  </div>
                  <div className="mt-4 space-y-4 text-sm text-zinc-600">
                    <div>
                      <p className="font-semibold text-zinc-900">Điểm nổi bật</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-zinc-600">
                        {selectedMetric.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900">Gợi ý hành động</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-amber-700">
                        {selectedMetric.recommendations.map((recommendation) => (
                          <li key={recommendation}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </SectionCard>

          <SectionCard
            title="Activity feed realtime"
            description="Tự động cập nhật khi có lead, lịch hoặc log mới."
          >
            <div className="max-h-[420px] space-y-3 overflow-y-auto pr-2">
              {visibleFeed.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-200 bg-white/90 p-4 text-sm text-zinc-600 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{item.timestamp}</span>
                    <span className="rounded-full bg-indigo-50 px-3 py-0.5 font-semibold text-indigo-500">{item.category}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-zinc-900">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-600">{item.detail}</p>
                  <p className="mt-2 text-xs font-semibold text-emerald-600">{item.impact}</p>
                </div>
              ))}
            </div>
            {canLoadMoreFeed ? (
              <button
                type="button"
                onClick={() => setFeedLimit((prev) => Math.min(prev + 3, coachActivityFeed.length))}
                className="w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50"
              >
                Tải thêm hoạt động
              </button>
            ) : null}
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
