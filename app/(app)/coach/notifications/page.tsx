"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import { coachNotifications } from "@/data/mockData";

export default function CoachNotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Thông báo</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Tổng hợp nhắc nhở từ lịch học và phản hồi của học viên.
        </p>
      </div>

      <SectionCard title="Danh sách thông báo" description="Sắp xếp theo thời gian gần nhất.">
        <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
          {coachNotifications.map((notification) => (
            <li key={notification.title} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>{notification.time}</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-200">{notification.title}</span>
              </div>
              <p className="mt-2 text-sm">{notification.message}</p>
              <button className="mt-3 inline-flex items-center rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                Đánh dấu đã đọc
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
