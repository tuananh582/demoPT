"use client";

import { useMemo, useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import { upcomingSchedules } from "@/data/mockData";

type ScheduleType = "group" | "one_on_one" | "online";

interface ScheduleItem {
  title: string;
  type: ScheduleType;
  time: string;
  coach: string;
  link: string;
}

const scheduleTypeOptions: Array<{ value: ScheduleType; label: string }> = [
  { value: "group", label: "Nhóm" },
  { value: "one_on_one", label: "1-1" },
  { value: "online", label: "Online" },
];

const createInitialScheduleState = (): ScheduleItem => {
  const first = upcomingSchedules[0];
  return first
    ? {
        title: first.title,
        type: first.type as ScheduleType,
        time: first.time,
        coach: first.coach,
        link: first.link,
      }
    : {
        title: "",
        type: "group",
        time: "",
        coach: "",
        link: "",
      };
};

export default function AdminSchedulePage() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(() =>
    upcomingSchedules.map((item) => ({
      title: item.title,
      type: item.type as ScheduleType,
      time: item.time,
      coach: item.coach,
      link: item.link,
    })),
  );
  const [showManager, setShowManager] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(schedules.length > 0 ? 0 : null);
  const [formState, setFormState] = useState<ScheduleItem>(() => createInitialScheduleState());
  const [formError, setFormError] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const selectedScheduleTitle = useMemo(() => {
    if (selectedIndex === null) {
      return "";
    }
    return schedules[selectedIndex]?.title ?? "";
  }, [selectedIndex, schedules]);

  const openManager = () => {
    if (schedules.length === 0) {
      return;
    }
    setSelectedIndex(0);
    setFormState({ ...schedules[0] });
    setShowManager(true);
    setFormError("");
    setFeedbackMessage("");
  };

  const closeManager = () => {
    setShowManager(false);
    setFormError("");
    setFeedbackMessage("");
    setSelectedIndex(schedules.length > 0 ? 0 : null);
    setFormState(createInitialScheduleState());
  };

  const startEdit = (index: number) => {
    setSelectedIndex(index);
    setFormState({ ...schedules[index] });
    setShowManager(true);
    setFormError("");
    setFeedbackMessage("");
  };

  const handleMove = (index: number, offset: number) => {
    const targetIndex = index + offset;
    if (targetIndex < 0 || targetIndex >= schedules.length) {
      return;
    }
    setSchedules((prev) => {
      const next = [...prev];
      const [removed] = next.splice(index, 1);
      next.splice(targetIndex, 0, removed);
      return next;
    });
    setFeedbackMessage("Đã sắp xếp lại lịch.");
    setSelectedIndex(targetIndex);
  };

  const handleChange = (field: keyof ScheduleItem, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (selectedIndex === null) {
      return;
    }

    const trimmedTime = formState.time.trim();
    const trimmedLink = formState.link.trim();
    const trimmedCoach = formState.coach.trim();
    const trimmedTitle = formState.title.trim();

    if (!trimmedTitle || !trimmedTime || !trimmedCoach || !trimmedLink) {
      setFormError("Vui lòng điền đầy đủ tiêu đề, thời gian, coach và link.");
      return;
    }

    if (!trimmedLink.startsWith("http")) {
      setFormError("Link buổi học phải bắt đầu bằng http hoặc https.");
      return;
    }

    setSchedules((prev) =>
      prev.map((item, index) =>
        index === selectedIndex
          ? {
              title: trimmedTitle,
              type: formState.type,
              time: trimmedTime,
              coach: trimmedCoach,
              link: trimmedLink,
            }
          : item
      )
    );
    setFeedbackMessage("Đã cập nhật thông tin buổi học.");
    setFormError("");
  };

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Lịch học</h2>
        <p className="text-sm text-zinc-500">
          Tổng hợp các buổi học sắp diễn ra để điều phối coach và thông báo cho học viên.
        </p>
      </section>

      <SectionCard
        title="Lịch theo tuần"
        description="Danh sách sắp xếp theo thời gian, bao gồm loại buổi và liên kết tham gia."
        actions={
          schedules.length > 0 ? (
            <button
              type="button"
              onClick={showManager ? closeManager : openManager}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
            >
              {showManager ? "Đóng trình sắp xếp" : "Sắp xếp lịch"}
            </button>
          ) : null
        }
      >
        {feedbackMessage ? <p className="mb-4 text-sm text-emerald-600">{feedbackMessage}</p> : null}
        <ul className="space-y-3 text-sm text-zinc-700">
          {schedules.map((item, index) => (
            <li key={`${item.title}-${item.time}`} className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-zinc-900">{item.title}</p>
                <span className="text-xs uppercase tracking-wide text-zinc-500">
                  {scheduleTypeOptions.find((option) => option.value === item.type)?.label ?? item.type}
                </span>
              </div>
              <p className="text-sm text-zinc-600">Thời gian: {item.time}</p>
              <p className="text-sm text-zinc-600">Coach phụ trách: {item.coach}</p>
              <p className="text-xs text-zinc-500">Liên kết/địa điểm: {item.link}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100">
                  Xác nhận
                </button>
                <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100">
                  Gửi nhắc
                </button>
                <button
                  type="button"
                  onClick={() => startEdit(index)}
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Lên
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === schedules.length - 1}
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Xuống
                </button>
              </div>
            </li>
          ))}
        </ul>

        {showManager && selectedIndex !== null ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-dashed border-zinc-300 p-4">
            <h3 className="text-sm font-semibold text-zinc-900">
              Chỉnh sửa buổi: <span className="font-medium text-zinc-700">{selectedScheduleTitle}</span>
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Tiêu đề buổi học
                <input
                  type="text"
                  value={formState.title}
                  onChange={(event) => handleChange("title", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Loại buổi
                <select
                  value={formState.type}
                  onChange={(event) => handleChange("type", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                >
                  {scheduleTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Thời gian
                <input
                  type="text"
                  value={formState.time}
                  onChange={(event) => handleChange("time", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  placeholder="Ví dụ: Thứ 4, 07:30 - 08:30"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Coach phụ trách
                <input
                  type="text"
                  value={formState.coach}
                  onChange={(event) => handleChange("coach", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Link Google Meet/địa điểm
              <input
                type="url"
                value={formState.link}
                onChange={(event) => handleChange("link", event.target.value)}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                placeholder="https://meet.google.com/..."
                required
              />
            </label>
            {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeManager}
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        ) : null}
      </SectionCard>
    </>
  );
}
