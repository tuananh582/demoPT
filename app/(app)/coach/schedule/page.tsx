"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import { coachSchedule } from "@/data/mockData";

export default function CoachSchedulePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Lịch làm việc</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Theo dõi các buổi trong tuần và xác nhận nhanh với học viên.
        </p>
      </div>

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
