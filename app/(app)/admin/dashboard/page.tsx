"use client";

import { useMemo, useState } from "react";
import { MicroBarChart } from "@/components/charts/MicroBarChart";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { revenueSummary, upcomingSchedules, realtimeEventSeeds } from "@/data/mockData";
import { useRealtimeEvents } from "@/hooks/useRealtimeEvents";

const timeframeOptions = [
  { key: "week", label: "Tuần" },
  { key: "month", label: "Tháng" },
  { key: "year", label: "Năm" },
] as const;

type TimeframeKey = (typeof timeframeOptions)[number]["key"];

const eventFilterOptions = [
  { key: "all", label: "Tất cả" },
  { key: "lead", label: "Lead mới" },
  { key: "progress", label: "Cập nhật coach" },
  { key: "schedule", label: "Lịch" },
] as const;

type EventFilterKey = (typeof eventFilterOptions)[number]["key"];

export default function AdminDashboardPage() {
  const [timeframe, setTimeframe] = useState<TimeframeKey>("week");
  const [eventFilter, setEventFilter] = useState<EventFilterKey>("all");
  const revenueData = useMemo(() => revenueSummary[timeframe], [timeframe]);
  const { events, markAsRead, markAllAsRead } = useRealtimeEvents(realtimeEventSeeds, 10000);
  const filteredEvents = useMemo(
    () => events.filter((event) => (eventFilter === "all" ? true : event.type === eventFilter)),
    [eventFilter, events],
  );
  const unreadCount = events.filter((event) => event.status === "new").length;
  const connectionStatus = events.length > 0;

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
            <StatCard label="Tổng doanh thu" value={revenueData.total} description={revenueData.change} tone="graphite" />
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
        <StatCard label="Học viên hoạt động" value="134" description="+12 so với tháng trước" tone="emerald" />
        <StatCard label="Coach đang làm việc" value="18" description="Tỷ lệ phủ lịch 92%" tone="sky" />
        <StatCard label="Buổi online trong tuần" value="28" description="5 buổi chờ xác nhận" tone="amber" />
        <StatCard label="Feedback tích cực" value="87%" description="30 ngày gần nhất" tone="fuchsia" />
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

      <SectionCard
        title="Thông báo realtime"
        description="Admin nhận sự kiện ngay khi có lead mới, coach cập nhật tiến độ hoặc lịch thay đổi."
      >
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center gap-2 text-zinc-500">
            <span className={`h-2 w-2 rounded-full ${connectionStatus ? "bg-emerald-500" : "bg-amber-500"}`} />
            <span>{connectionStatus ? "Đang kết nối" : "Đang thử kết nối lại..."}</span>
            <span className="rounded-full bg-zinc-900/5 px-2 py-0.5 font-semibold text-zinc-700">{unreadCount} mới</span>
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 font-semibold text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Đánh dấu tất cả đã đọc
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {eventFilterOptions.map((option) => {
            const isActive = option.key === eventFilter;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setEventFilter(option.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                  isActive ? "bg-indigo-600 text-white" : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {filteredEvents.slice(0, 6).map((event) => (
            <div
              key={event.id}
              className={`rounded-2xl border p-4 text-sm transition ${
                event.status === "new"
                  ? "border-indigo-400 bg-indigo-50/80 shadow"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{event.occurredAt}</span>
                <span
                  className={`rounded-full px-3 py-0.5 font-semibold ${
                    event.type === "lead"
                      ? "bg-emerald-100 text-emerald-700"
                      : event.type === "progress"
                        ? "bg-sky-100 text-sky-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {event.type === "lead" ? "Lead mới" : event.type === "progress" ? "Log coach" : "Lịch"}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-zinc-900">{event.title}</p>
              <p className="mt-1 text-sm text-zinc-600">{event.message}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                <span>{event.actor}</span>
                {event.status === "new" ? (
                  <button
                    type="button"
                    onClick={() => markAsRead(event.id)}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Đánh dấu đã đọc
                  </button>
                ) : (
                  <span className="font-semibold text-emerald-500">Đã đọc</span>
                )}
              </div>
            </div>
          ))}
          {filteredEvents.length === 0 ? (
            <p className="rounded-xl border border-dashed border-zinc-200 px-4 py-6 text-center text-sm text-zinc-500">
              Không có sự kiện phù hợp với bộ lọc.
            </p>
          ) : null}
        </div>
      </SectionCard>
    </>
  );
}
