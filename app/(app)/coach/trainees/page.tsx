"use client";

import { useMemo, useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import { coachTrainees } from "@/data/mockData";

const statusFilters = [
  { value: "all", label: "Tất cả" },
  { value: "Lead", label: "Lead" },
  { value: "Trial", label: "Trial" },
  { value: "Active", label: "Active" },
] as const;

type StatusFilter = (typeof statusFilters)[number]["value"];

export default function CoachTraineesPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [selectedTrainee, setSelectedTrainee] = useState(coachTrainees[0]);

  const filteredTrainees = useMemo(() => {
    if (filter === "all") {
      return coachTrainees;
    }
    return coachTrainees.filter((trainee) => trainee.status === filter);
  }, [filter]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Danh sách học viên</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Lọc theo trạng thái và xem nhanh mục tiêu, chương trình của từng học viên.
        </p>
      </div>

      <SectionCard
        title="Học viên phụ trách"
        description="Chọn học viên để xem thông tin chi tiết và cập nhật gần nhất."
        actions={
          <div className="inline-flex gap-2 rounded-full border border-zinc-300 p-1 text-xs dark:border-zinc-600">
            {statusFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  filter === item.value
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-3 md:grid-cols-2">
            {filteredTrainees.map((trainee) => {
              const isSelected = trainee.name === selectedTrainee.name;
              return (
                <button
                  key={trainee.name}
                  type="button"
                  onClick={() => setSelectedTrainee(trainee)}
                  className={`flex flex-col gap-2 rounded-xl border px-4 py-4 text-left transition ${
                    isSelected
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                      : "border-zinc-200 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
                  }`}
                >
                  <p className="text-base font-semibold">{trainee.name}</p>
                  <p className="text-sm text-inherit">Trạng thái: {trainee.status}</p>
                  <p className="text-sm text-inherit">Mục tiêu: {trainee.goal}</p>
                  <p className="text-sm text-inherit">Kế hoạch: {trainee.plan}</p>
                  <p className="text-xs opacity-80">Buổi tới: {trainee.nextSession}</p>
                </button>
              );
            })}
          </div>
          <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Thông tin chi tiết</h3>
            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{selectedTrainee.name}</p>
              <p>Trạng thái: {selectedTrainee.status}</p>
              <p>Mục tiêu chính: {selectedTrainee.goal}</p>
              <p>Chương trình hiện tại: {selectedTrainee.plan}</p>
              <p>Buổi tiếp theo: {selectedTrainee.nextSession}</p>
            </div>
            <button className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
              Cập nhật ghi chú
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
