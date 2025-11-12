"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import {
  coachDashboardStats,
  coachNavItems,
  coachNotifications,
  coachSchedule,
  coachTrainees,
  progressSnapshots,
} from "@/data/mockData";

const statusFilters = [
  { value: "all", label: "Tất cả" },
  { value: "Lead", label: "Lead" },
  { value: "Trial", label: "Trial" },
  { value: "Active", label: "Active" },
] as const;

type StatusFilter = (typeof statusFilters)[number]["value"];

export default function CoachPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [selectedTrainee, setSelectedTrainee] = useState(coachTrainees[0]);

  const filteredTrainees = useMemo(() => {
    if (filter === "all") {
      return coachTrainees;
    }
    return coachTrainees.filter((trainee) => trainee.status === filter);
  }, [filter]);

  return (
    <AppShell title="Không gian Coach" navItems={coachNavItems} roleGuard="coach">
      <div className="space-y-8">
        <div id="coach-dashboard" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Tổng học viên" value={coachDashboardStats.total} description="Lead + Trial + Active" variant="accent" />
          <StatCard label="Lead" value={coachDashboardStats.lead} description="Cần tư vấn chiến lược" />
          <StatCard label="Trial" value={coachDashboardStats.trial} description="Theo sát 2 tuần đầu" />
          <StatCard label="Active" value={coachDashboardStats.active} description="Đang theo chương trình chính" />
        </div>

        <SectionCard
          id="coach-trainees"
          title="Học viên phụ trách"
          description="Chọn học viên để xem mục tiêu, chương trình và buổi kế tiếp."
          actions={
          <div className="inline-flex gap-2 rounded-2xl bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
            {statusFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`rounded-xl px-3 py-1.5 font-semibold transition ${
                  filter === item.value ? "bg-indigo-500 text-white shadow" : "text-zinc-600 hover:bg-white dark:text-zinc-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTrainees.map((trainee) => {
              const isSelected = trainee.name === selectedTrainee.name;
              const badgeClass =
                trainee.status === "Active"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                  : trainee.status === "Trial"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200"
                    : "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200";
              return (
                <button
                  key={trainee.name}
                  type="button"
                  onClick={() => setSelectedTrainee(trainee)}
                  className={`flex flex-col gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 shadow dark:border-indigo-400 dark:bg-indigo-500/10"
                      : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:shadow dark:border-zinc-700 dark:bg-zinc-950/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">{trainee.name}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>{trainee.status}</span>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Mục tiêu: {trainee.goal}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Kế hoạch: {trainee.plan}</p>
                  <p className="text-xs font-medium text-indigo-500 dark:text-indigo-300">Buổi tới: {trainee.nextSession}</p>
                </button>
              );
            })}
          </div>
          <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Tổng quan học viên</h3>
            <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/80 p-4 text-sm text-indigo-700 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-indigo-200">
              <p className="font-semibold">{selectedTrainee.name}</p>
              <p className="mt-1 text-xs">Mục tiêu chính: {selectedTrainee.goal}</p>
              <p className="mt-1 text-xs">Chương trình hiện tại: {selectedTrainee.plan}</p>
            </div>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              <div className="flex items-start justify-between gap-4">
                <p className="font-medium">Meal plan</p>
                <p className="text-right text-xs text-zinc-500 dark:text-zinc-400">
                  Tuần 3/12 - cân chỉnh 1.900 kcal/ngày, tăng protein +10%
                </p>
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="font-medium">Program</p>
                <p className="text-right text-xs text-zinc-500 dark:text-zinc-400">
                  Chia lịch Upper/Lower + buổi conditioning cuối tuần
                </p>
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="font-medium">Lưu ý coaching</p>
                <p className="text-right text-xs text-zinc-500 dark:text-zinc-400">
                  Cần nhắc nhở giấc ngủ & uống nước 2.5L/ngày
                </p>
              </div>
            </div>
            <button className="w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
              Cập nhật ghi chú buổi tập
            </button>
          </div>
        </div>
        </SectionCard>

        <SectionCard
          id="progress"
          title="Tiến trình học viên"
          description="Theo dõi thay đổi cân nặng, % mỡ và ghi chú huấn luyện."
        >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-500">Cập nhật gần nhất</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              {progressSnapshots.map((snapshot) => (
                <li key={snapshot.date} className="rounded-2xl border border-zinc-200 bg-white/60 p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>{snapshot.date}</span>
                    <span>{snapshot.weight}</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Body fat: {snapshot.bodyFat}</p>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{snapshot.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-500">Checklist buổi tập</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <li>✅ Ghi nhận RPE sau mỗi set chính.</li>
                <li>✅ Nhắn nhở chụp ảnh trước/sau mỗi 2 tuần.</li>
                <li>✅ Theo dõi giờ ngủ trung bình trong app đồng bộ.</li>
                <li>✅ Đặt câu hỏi feedback cuối buổi (ăn uống, năng lượng).</li>
              </ul>
            </div>
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
              Báo cáo tiến trình tự động cập nhật dashboard khi coach tạo log mới.
            </div>
          </div>
        </div>
        </SectionCard>

        <SectionCard
          id="coach-schedule"
          title="Lịch làm việc"
          description="Các buổi trong 3 ngày tới, phân loại trạng thái và link họp."
        >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coachSchedule.map((slot) => (
            <div
              key={slot.title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-indigo-500">
                <span>{slot.time}</span>
                <span>{slot.status}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{slot.title}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{slot.link}</p>
              <div className="mt-4 flex gap-2 text-xs">
                <button className="flex-1 rounded-xl border border-zinc-200 px-3 py-2 font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  Xác nhận
                </button>
                <button className="flex-1 rounded-xl border border-zinc-200 px-3 py-2 font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  Gửi nhắc
                </button>
              </div>
            </div>
          ))}
        </div>
        </SectionCard>

        <SectionCard
          id="notifications"
          title="Thông báo"
          description="Tổng hợp sự kiện lịch, feedback và hành động cần xử lý."
        >
        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
          {coachNotifications.map((notification) => (
            <li key={notification.title} className="rounded-2xl border border-zinc-200 bg-white/70 p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>{notification.time}</span>
                <span className="font-medium text-indigo-500 dark:text-indigo-300">{notification.title}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{notification.message}</p>
              <button className="mt-3 inline-flex items-center text-xs font-medium text-indigo-500 hover:text-indigo-400">
                Đánh dấu đã đọc
              </button>
            </li>
          ))}
        </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}
