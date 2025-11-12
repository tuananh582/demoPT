"use client";

import { useMemo, useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  coachAgenda,
  coachActionQueue,
  coachSchedule,
  coachWeekView,
  coachWeeklySummary,
} from "@/data/mockData";

const rangeOptions = [
  { value: "week", label: "Tuần" },
  { value: "month", label: "Tháng" },
] as const;

const viewModes = [
  { value: "week", label: "Lưới tuần" },
  { value: "agenda", label: "Agenda" },
] as const;

type RangeOption = (typeof rangeOptions)[number]["value"];
type ViewMode = (typeof viewModes)[number]["value"];

export default function CoachSchedulePage() {
  const [range, setRange] = useState<RangeOption>("week");
  const [viewMode, setViewMode] = useState<ViewMode>("week");

  const completionRate = useMemo(() => {
    if (coachWeeklySummary.totalSessions === 0) {
      return 0;
    }
    return Math.round((coachWeeklySummary.completedSessions / coachWeeklySummary.totalSessions) * 100);
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Lịch làm việc</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Điều phối buổi nhóm, 1-1 và online với bộ lọc rõ ràng, hàng đợi xác nhận và agenda theo thời gian thực.
        </p>
      </div>

      <SectionCard
        title="Điều khiển lịch"
        description={`Hiển thị ${range === "week" ? "tuần hiện tại" : "theo tháng"} và chuyển đổi giữa lưới tuần hoặc agenda.`}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="inline-flex gap-2 rounded-full border border-zinc-300 p-1 dark:border-zinc-600">
            {rangeOptions.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setRange(item.value)}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  range === item.value
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="inline-flex gap-2 rounded-full border border-zinc-300 p-1 dark:border-zinc-600">
            {viewModes.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setViewMode(item.value)}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  viewMode === item.value
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <button className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
              Tạo buổi mới
            </button>
            <button className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
              Xuất lịch
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Tổng quan tuần"
        description={`Tuần ${coachWeeklySummary.weekRange} · ${completionRate}% buổi đã hoàn thành`}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Tổng buổi</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {coachWeeklySummary.totalSessions}
            </p>
            <p>Đã hoàn thành: {coachWeeklySummary.completedSessions}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Buổi đang chờ</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              {coachWeeklySummary.totalSessions -
                coachWeeklySummary.completedSessions -
                coachWeeklySummary.cancelledSessions}
            </p>
            <p>Chưa xác nhận 1-1: 2</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Tỷ lệ hoàn thành</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{completionRate}%</p>
              <span className="text-xs text-green-600 dark:text-green-400">+4% so với tuần trước</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-zinc-900 dark:bg-white"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <SectionCard
          title={viewMode === "week" ? "Lịch tuần" : "Agenda chi tiết"}
          description={
            viewMode === "week"
              ? "Xem tổng thể các buổi theo cột ngày, giữ bố cục trắng/đen để tập trung vào nội dung."
              : "Danh sách tuần tự 72 giờ tới giúp xử lý lần lượt."
          }
        >
          {viewMode === "week" ? (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {coachWeekView.map((day) => (
                <div
                  key={day.day}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{day.day}</p>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{day.date}</span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {day.slots.length === 0 ? (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Không có buổi nào.</p>
                    ) : (
                      day.slots.map((slot) => (
                        <div
                          key={`${slot.title}-${slot.time}`}
                          className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900/50"
                        >
                          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            {slot.time}
                          </p>
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100">{slot.title}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{slot.location}</p>
                          <span
                            className={`mt-2 inline-flex rounded-full px-2 py-1 text-[11px] font-semibold uppercase ${
                              slot.status === "confirmed"
                                ? "bg-green-100 text-green-700 dark:bg-green-400/20 dark:text-green-300"
                                : slot.status === "pending"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300"
                                  : slot.status === "cancelled"
                                    ? "bg-red-100 text-red-700 dark:bg-red-400/20 dark:text-red-300"
                                    : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                            }`}
                          >
                            {slot.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {coachAgenda.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{item.time}</p>
                      <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.channel}</span>
                  </div>
                  <p>{item.note}</p>
                  <div className="mt-3 flex gap-2 text-xs">
                    <button className="rounded-full border border-zinc-300 px-3 py-1 font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                      Mở chi tiết
                    </button>
                    <button className="rounded-full border border-zinc-300 px-3 py-1 font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                      Gửi nhắc
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Hàng đợi hành động" description="Các mục cần xác nhận hoặc follow-up.">
            <div className="space-y-3">
              {coachActionQueue.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${
                        item.type === "confirm"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300"
                          : item.type === "follow_up"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-400/20 dark:text-blue-300"
                            : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {item.type === "confirm"
                        ? "Chờ xác nhận"
                        : item.type === "follow_up"
                          ? "Follow-up"
                          : "Nhắc nhở"}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {item.time} • {item.channel}
                  </p>
                  <p>{item.note}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                      Xác nhận
                    </button>
                    <button className="flex-1 rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                      Đặt lại
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Buổi sắp tới" description="Danh sách lịch trong 3 ngày tiếp theo.">
            <div className="space-y-3">
              {coachSchedule.map((slot) => (
                <div
                  key={slot.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>{slot.time}</span>
                    <span className="uppercase tracking-wide">{slot.status}</span>
                  </div>
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{slot.title}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{slot.link}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                      Xác nhận
                    </button>
                    <button className="flex-1 rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                      Gửi nhắc
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
