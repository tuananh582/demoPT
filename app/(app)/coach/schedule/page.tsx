"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import { coachSchedule, coachWeeklySummary } from "@/data/mockData";

export default function CoachSchedulePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Lịch làm việc</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Theo dõi các buổi trong tuần và xác nhận nhanh với học viên.
        </p>
      </div>

      <SectionCard
        title="Thống kê tuần này"
        description={`Tổng hợp các buổi đã và sẽ diễn ra trong tuần ${coachWeeklySummary.weekRange}.`}
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
          <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Tổng buổi</p>
              <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{coachWeeklySummary.totalSessions}</p>
            </div>
            <div className="grid gap-2 text-right">
              <p>
                <span className="font-semibold text-green-600 dark:text-green-400">{coachWeeklySummary.completedSessions}</span>
                <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">hoàn thành</span>
              </p>
              <p>
                <span className="font-semibold text-red-600 dark:text-red-400">{coachWeeklySummary.cancelledSessions}</span>
                <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">hủy</span>
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {coachWeeklySummary.sessions.map((session) => (
              <div
                key={`${session.day}-${session.time}-${session.title}`}
                className="flex items-start justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{session.day}</p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{session.title}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{session.time}</p>
                </div>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Buổi sắp tới" description="Danh sách lịch trong 3 ngày tiếp theo.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {coachSchedule.map((slot) => (
            <div key={slot.title} className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>{slot.time}</span>
                <span className="uppercase tracking-wide">{slot.status}</span>
              </div>
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{slot.title}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{slot.link}</p>
              <div className="mt-auto flex gap-2">
                <button className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                  Xác nhận
                </button>
                <button className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                  Gửi nhắc
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
