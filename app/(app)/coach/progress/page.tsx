"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import { progressSnapshots } from "@/data/mockData";

const checklistItems = [
  "Ghi nhận RPE sau các set chính",
  "Nhắc học viên cập nhật ảnh 2 tuần/lần",
  "Theo dõi giấc ngủ trung bình",
  "Thu thập feedback cuối buổi",
];

export default function CoachProgressPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Theo dõi tiến trình</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Tổng hợp chỉ số mới nhất và checklist cần hoàn thành cho từng buổi huấn luyện.
        </p>
      </div>

      <SectionCard title="Nhật ký chỉ số" description="Lọc từ log cập nhật gần nhất của học viên.">
        <ul className="space-y-3">
          {progressSnapshots.map((snapshot) => (
            <li key={snapshot.date} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>{snapshot.date}</span>
                <span>{snapshot.weight}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Body fat: {snapshot.bodyFat}</p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{snapshot.note}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Checklist buổi tập" description="Những việc cần đảm bảo khi kết thúc buổi huấn luyện.">
        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
          {checklistItems.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-zinc-900 dark:bg-white" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
