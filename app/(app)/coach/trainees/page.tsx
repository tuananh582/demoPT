"use client";

import { useMemo, useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  coachTrainees,
  traineeMealPlans,
  traineeMeasurements,
  traineeInsights,
} from "@/data/mockData";

const statusFilters = [
  { value: "all", label: "Tất cả" },
  { value: "Lead", label: "Lead" },
  { value: "Trial", label: "Trial" },
  { value: "Active", label: "Active" },
] as const;

type StatusFilter = (typeof statusFilters)[number]["value"];

const detailTabs = [
  { label: "Tổng quan", value: "overview" },
  { label: "Mục tiêu & chương trình", value: "goals" },
  { label: "Meal plan", value: "meal" },
  { label: "Tiến trình", value: "progress" },
] as const;

type DetailTab = (typeof detailTabs)[number]["value"];

export default function CoachTraineesPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const defaultTrainee = coachTrainees[0];
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [selectedTraineeId, setSelectedTraineeId] = useState(defaultTrainee?.name ?? "");

  const filteredTrainees = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return coachTrainees.filter((trainee) => {
      const matchStatus = filter === "all" || trainee.status === filter;
      const matchSearch =
        normalizedSearch.length === 0 ||
        trainee.name.toLowerCase().includes(normalizedSearch) ||
        trainee.plan.toLowerCase().includes(normalizedSearch) ||
        trainee.goal.toLowerCase().includes(normalizedSearch);
      return matchStatus && matchSearch;
    });
  }, [filter, search]);

  const resolvedTrainee = useMemo(() => {
    if (filteredTrainees.length === 0) {
      return coachTrainees.find((trainee) => trainee.name === selectedTraineeId) ?? defaultTrainee;
    }
    const matched = filteredTrainees.find((trainee) => trainee.name === selectedTraineeId);
    return matched ?? filteredTrainees[0];
  }, [defaultTrainee, filteredTrainees, selectedTraineeId]);

  const selectedTrainee = resolvedTrainee ?? defaultTrainee;
  const selectedName = selectedTrainee?.name ?? "";

  if (!selectedTrainee || !selectedName) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Quản lý học viên</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Hiện chưa có dữ liệu học viên để hiển thị. Hãy thêm học viên mới để bắt đầu quản lý.
          </p>
        </div>
      </div>
    );
  }

  const handleSelectTrainee = (traineeName: string) => {
    setSelectedTraineeId(traineeName);
    setActiveTab("overview");
  };

  const mealPlan = selectedName ? traineeMealPlans[selectedName] : undefined;
  const measurements = selectedName ? traineeMeasurements[selectedName] ?? [] : [];
  const insight = selectedName ? traineeInsights[selectedName] : undefined;
  const upcomingSessions = insight?.upcomingSessions ?? [];
  const reminders = insight?.reminders ?? [];
  const focusAreas = insight?.focusAreas ?? [];
  const timeline = insight?.timeline ?? [];
  const metricEntries = insight ? Object.entries(insight.metrics) : [];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Quản lý học viên</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Bảng điều khiển đa tab giúp bạn lọc nhanh danh sách, đọc insight và cập nhật meal plan, tiến trình.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr_320px]">
        <SectionCard
          title="Pipeline học viên"
          description="Tìm kiếm và lọc theo trạng thái để tập trung đúng nhóm."
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
          <div className="space-y-3">
            <div className="relative">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm theo tên, mục tiêu, chương trình..."
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-xs text-zinc-400">
                {filteredTrainees.length}/{coachTrainees.length}
              </span>
            </div>
            <div className="space-y-2">
              {filteredTrainees.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Không tìm thấy học viên phù hợp bộ lọc hiện tại.
                </p>
              ) : (
                filteredTrainees.map((trainee) => {
                  const isSelected = trainee.name === selectedName;
                  return (
                    <button
                      key={trainee.name}
                      type="button"
                      onClick={() => handleSelectTrainee(trainee.name)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                        isSelected
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                          : "border-zinc-200 bg-white hover:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-base font-semibold">{trainee.name}</p>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${
                            trainee.status === "Active"
                              ? "bg-green-100 text-green-700 dark:bg-green-400/20 dark:text-green-300"
                              : trainee.status === "Trial"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300"
                                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                          }`}
                        >
                          {trainee.status}
                        </span>
                      </div>
                      <p className="text-sm text-inherit">Mục tiêu: {trainee.goal}</p>
                      <p className="text-sm text-inherit">Kế hoạch: {trainee.plan}</p>
                      <p className="text-xs opacity-80">Buổi tới: {trainee.nextSession}</p>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Thông tin học viên"
          description="Chi tiết chương trình cá nhân hoá và nhật ký làm việc."
          actions={
            <div className="inline-flex gap-2 text-xs">
              <button
                className="rounded-full border border-zinc-300 px-3 py-1 font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                type="button"
              >
                Tạo check-in
              </button>
              <button
                className="rounded-full border border-zinc-300 px-3 py-1 font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                type="button"
              >
                Gửi nhắc
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{selectedTrainee.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{selectedTrainee.plan}</p>
                </div>
                <div className="text-right text-sm text-zinc-600 dark:text-zinc-300">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{selectedTrainee.package}</p>
                  <p>Buổi kế tiếp: {selectedTrainee.nextSession}</p>
                  <p>Lần check-in gần nhất: {selectedTrainee.lastCheckIn}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 text-sm text-zinc-600 dark:text-zinc-300 sm:grid-cols-3">
                <p>Email: {selectedTrainee.email}</p>
                <p>Điện thoại: {selectedTrainee.phone}</p>
                <p>Risk: {selectedTrainee.riskLevel}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {detailTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`rounded-full border px-4 py-1 text-sm font-medium transition ${
                    activeTab === tab.value
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                      : "border-transparent bg-zinc-100 text-zinc-600 hover:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {metricEntries.map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                    >
                      <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{key}</p>
                      <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {typeof value === "number" ? `${value}${key === "sessionsThisWeek" ? "" : "%"}` : value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900/50">
                  <p className="text-zinc-700 dark:text-zinc-200">{insight?.summary}</p>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Dòng thời gian gần đây</p>
                  <div className="space-y-3">
                    {timeline.map((event) => (
                      <div
                        key={`${event.date}-${event.title}`}
                        className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{event.date}</p>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">{event.title}</p>
                        <p>{event.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "goals" && (
              <div className="space-y-4">
                {focusAreas.map((area) => (
                  <div
                    key={area.label}
                    className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{area.label}</p>
                      <span
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold uppercase ${
                          area.status === "on_track"
                            ? "bg-green-100 text-green-700 dark:bg-green-400/20 dark:text-green-300"
                            : area.status === "pending"
                              ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300"
                        }`}
                      >
                        {area.status === "on_track"
                          ? "Đúng tiến độ"
                          : area.status === "pending"
                            ? "Chờ bắt đầu"
                            : "Có rủi ro"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm">Hạn: {area.due}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{area.note}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "meal" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">Thực đơn tuần</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{mealPlan?.weekRange ?? "Chưa có"}</p>
                  </div>
                  <button className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                    Tạo từ template
                  </button>
                </div>
                {mealPlan ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {mealPlan.days.map((day) => (
                      <div
                        key={`${selectedTrainee.name}-${day.day}`}
                        className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                      >
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">{day.day}</p>
                        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{mealPlan.hydrationNote}</p>
                        <ul className="mt-3 space-y-1 text-sm">
                          <li>
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">Sáng:</span>{" "}
                            {day.meals.breakfast}
                          </li>
                          <li>
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">Trưa:</span>{" "}
                            {day.meals.lunch}
                          </li>
                          <li>
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">Tối:</span>{" "}
                            {day.meals.dinner}
                          </li>
                          {day.meals.snack ? (
                            <li>
                              <span className="font-medium text-zinc-900 dark:text-zinc-100">Phụ:</span>{" "}
                              {day.meals.snack}
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Chưa có meal plan. Bắt đầu bằng cách chọn template có sẵn hoặc nhập mới.
                  </p>
                )}
              </div>
            )}

            {activeTab === "progress" && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Lần đo gần nhất</p>
                    <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                      {measurements[0]?.weight ?? "--"}
                    </p>
                    <p>Cân nặng</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Body fat</p>
                    <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                      {measurements[0]?.bodyFat ?? "--"}
                    </p>
                    <p>Tỷ lệ mỡ</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Muscle</p>
                    <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                      {measurements[0]?.muscleMass ?? "--"}
                    </p>
                    <p>Khối cơ</p>
                  </div>
                </div>
                <div className="space-y-3 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-semibold">Lịch sử đo chỉ số</p>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {measurements.length > 0 ? `${measurements.length} lần ghi nhận` : "Chưa có"}
                    </span>
                  </div>
                  {measurements.length > 0 ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-2 rounded-md bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-900/60 dark:text-zinc-400">
                        <span>Buổi tập</span>
                        <span>Cân nặng</span>
                        <span>Body fat</span>
                        <span>Muscle</span>
                      </div>
                      {measurements.map((entry) => (
                        <div
                          key={`${selectedTrainee.name}-${entry.session}`}
                          className="grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
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
                    <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
                      Chưa có lần đo nào, hãy cập nhật sau buổi tập đầu tiên.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Buổi liên quan" description="Các lịch gắn với học viên này trong 3 ngày tới.">
            <div className="space-y-3">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <div
                    key={session.title}
                    className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{session.channel}</p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{session.title}</p>
                    <p>{session.time}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Địa điểm: {session.location}</p>
                  </div>
                ))
              ) : (
                <div
                  className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400"
                >
                  Chưa có lịch nào trong 72 giờ tới.
                </div>
              )}
            </div>
          </SectionCard>
          <SectionCard title="Nhắc nhở cá nhân" description="Điểm cần lưu ý trước khi lên lịch mới.">
            {reminders.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                {reminders.map((reminder) => (
                  <li key={reminder}>{reminder}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Chưa có nhắc nhở nào cho học viên này.</p>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
