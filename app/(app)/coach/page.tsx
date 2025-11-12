"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import {
  coachDashboardStats,
  coachNotifications,
  coachSchedule,
  coachTrainees,
  progressSnapshots,
} from "@/data/mockData";

export default function CoachOverviewPage() {
  const upcomingSessions = coachSchedule.slice(0, 3);
  const recentUpdates = progressSnapshots.slice(0, 2);
  const priorityTrainees = coachTrainees.slice(0, 2);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Tổng quan công việc</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Nắm nhanh số lượng học viên, lịch hẹn sắp tới và các cập nhật gần nhất.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Học viên phụ trách" value={coachDashboardStats.total} description="Lead, Trial và Active" />
        <StatCard label="Lead" value={coachDashboardStats.lead} description="Đang tư vấn" />
        <StatCard label="Trial" value={coachDashboardStats.trial} description="Theo dõi trải nghiệm" />
        <StatCard label="Active" value={coachDashboardStats.active} description="Đang theo chương trình" />
      </div>

      <SectionCard title="Học viên ưu tiên" description="Hai học viên cần theo sát trong tuần này.">
        <ul className="space-y-3">
          {priorityTrainees.map((trainee) => (
            <li key={trainee.name} className="flex flex-col gap-2 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{trainee.name}</p>
                <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:border-zinc-600 dark:text-zinc-300">
                  {trainee.status}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Mục tiêu: {trainee.goal}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Chương trình: {trainee.plan}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Buổi tiếp theo: {trainee.nextSession}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Lịch sắp diễn ra" description="Ba buổi tiếp theo cần chuẩn bị.">
        <ul className="space-y-3">
          {upcomingSessions.map((session) => (
            <li key={session.title} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{session.time}</p>
              <p className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">{session.title}</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{session.link}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Cập nhật gần nhất" description="Nhật ký tiến trình và thông báo mới.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            {recentUpdates.map((snapshot) => (
              <div key={snapshot.date} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>{snapshot.date}</span>
                  <span>{snapshot.weight}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Body fat: {snapshot.bodyFat}</p>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{snapshot.note}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {coachNotifications.slice(0, 2).map((notification) => (
              <div key={notification.title} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>{notification.time}</span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-200">{notification.title}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
