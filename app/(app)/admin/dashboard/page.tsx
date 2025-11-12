"use client";

import { useMemo, useState } from "react";
import { MicroBarChart } from "@/components/charts/MicroBarChart";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { revenueSummary, upcomingSchedules } from "@/data/mockData";

const timeframeOptions = [
  { key: "week", label: "Tuần" },
  { key: "month", label: "Tháng" },
  { key: "year", label: "Năm" },
] as const;

type TimeframeKey = (typeof timeframeOptions)[number]["key"];

export default function AdminDashboardPage() {
  const [timeframe, setTimeframe] = useState<TimeframeKey>("week");
  const revenueData = useMemo(() => revenueSummary[timeframe], [timeframe]);

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Bảng điều khiển tổng quan</h2>
        <p className="text-sm text-zinc-500">
          Theo dõi doanh thu và hoạt động huấn luyện trong giai đoạn được chọn.
        </p>
      </section>

      <SectionCard
        title="Hiệu suất doanh thu"
        description="Số liệu cập nhật theo khung thời gian lựa chọn."
        actions={
          <div className="inline-flex gap-2">
            {timeframeOptions.map((option) => {
              const isActive = option.key === timeframe;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setTimeframe(option.key)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                    isActive ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300 text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <StatCard label="Tổng doanh thu" value={revenueData.total} description={revenueData.change} variant="accent" />
            <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">
              <p className="font-semibold text-zinc-900">Ghi chú nhanh</p>
              <ul className="mt-3 space-y-2">
                <li>
                  Lớp PT 1-1 đóng góp 45% doanh thu {timeframe === "week" ? "tuần" : timeframe === "month" ? "tháng" : "năm"}.
                </li>
                <li>Doanh thu dịch vụ online tăng 18% so với kỳ trước.</li>
                <li>Tỷ lệ hủy buổi dưới 4% trong giai đoạn hiện tại.</li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 p-6">
            <MicroBarChart labels={revenueData.labels} values={revenueData.series} />
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Học viên hoạt động" value="134" description="+12 so với tháng trước" />
        <StatCard label="Coach đang làm việc" value="18" description="Tỷ lệ phủ lịch 92%" />
        <StatCard label="Buổi online trong tuần" value="28" description="5 buổi chờ xác nhận" />
        <StatCard label="Feedback tích cực" value="87%" description="30 ngày gần nhất" />
      </div>

      <SectionCard
        title="Lịch sắp diễn ra"
        description="Hai buổi quan trọng kế tiếp để đảm bảo chuẩn bị đầy đủ."
      >
        <ul className="space-y-3 text-sm text-zinc-700">
          {upcomingSchedules.slice(0, 2).map((item) => (
            <li key={`${item.title}-${item.time}`} className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-zinc-900">{item.title}</p>
                <span className="text-xs uppercase tracking-wide text-zinc-500">{item.type === "group" ? "Nhóm" : "Cá nhân"}</span>
              </div>
              <p className="text-sm text-zinc-600">{item.time}</p>
              <p className="text-sm text-zinc-600">Coach: {item.coach}</p>
              <p className="text-xs text-zinc-500">Liên kết: {item.link}</p>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
