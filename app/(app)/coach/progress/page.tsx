"use client";

import { useMemo, useState } from "react";

import { SectionCard } from "@/components/ui/SectionCard";
import {
  coachTrainees,
  progressSnapshots,
  traineeMeasurements,
} from "@/data/mockData";

const checklistItems = [
  "Ghi nhận RPE sau các set chính",
  "Nhắc học viên cập nhật ảnh 2 tuần/lần",
  "Theo dõi giấc ngủ trung bình",
  "Thu thập feedback cuối buổi",
];

export default function CoachProgressPage() {
  const traineeOptions = useMemo(() => coachTrainees.map((t) => t.name), []);
  const [selectedTrainee, setSelectedTrainee] = useState(traineeOptions[0]);
  const measurementHistory = traineeMeasurements[selectedTrainee] ?? [];

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

      <SectionCard
        title="Lịch sử đo theo buổi"
        description="Tra cứu nhanh các lần đo chỉ số đã ghi nhận."
        actions={
          <div className="inline-flex gap-2 rounded-full border border-zinc-300 p-1 text-xs dark:border-zinc-600">
            {traineeOptions.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedTrainee(name)}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  selectedTrainee === name
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        }
      >
        {measurementHistory.length > 0 ? (
          <div className="space-y-2">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-2 rounded-md bg-zinc-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <span>Buổi tập</span>
              <span>Cân nặng</span>
              <span>Body fat</span>
              <span>Muscle</span>
            </div>
            {measurementHistory.map((entry) => (
              <div
                key={`${selectedTrainee}-${entry.session}`}
                className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
              >
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{entry.session}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{entry.recordedAt}</p>
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">{entry.note}</p>
                </div>
                <span>{entry.weight}</span>
                <span>{entry.bodyFat}</span>
                <span>{entry.muscleMass}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
            Chưa có dữ liệu đo cho học viên này.
          </p>
        )}
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
