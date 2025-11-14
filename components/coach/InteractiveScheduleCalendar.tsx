"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Clock, Link as LinkIcon, MapPin, Undo2 } from "lucide-react";

export interface CoachScheduleSlot {
  title: string;
  time: string;
  type: "group" | "one_on_one" | "online";
  location: string;
  status: "confirmed" | "pending" | "online" | "cancelled";
}

export interface CoachWeekDay {
  day: string;
  date: string;
  slots: CoachScheduleSlot[];
}

export interface SessionChangeDetail {
  id: string;
  slot: CoachScheduleSlot;
  fromDay: string;
  toDay: string;
  previousTime: string;
  newTime: string;
  reason: string;
  changedAt: string;
  notifiedAt: string;
  channel: string;
}

interface InteractiveScheduleCalendarProps {
  scheduleData: CoachWeekDay[];
  onSessionUpdate?: (change: SessionChangeDetail) => void;
  onUndo?: (changeId: string) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  reason: string;
  timestamp: string;
}

type PendingChangeState = {
  slot: CoachScheduleSlot;
  fromDay: string;
  toDay: string;
  newStart: string;
  newEnd: string;
  reason: string;
};

type HistoryEntry = {
  snapshot: CoachWeekDay[];
  change: SessionChangeDetail;
};

function cloneSchedule(data: CoachWeekDay[]): CoachWeekDay[] {
  return data.map((day) => ({
    ...day,
    slots: day.slots.map((slot) => ({ ...slot })),
  }));
}

function timeStringToMinutes(time: string): number {
  const [hour = "0", minute = "0"] = time.split(":");
  return Number.parseInt(hour, 10) * 60 + Number.parseInt(minute, 10);
}

function parseRange(range: string): { start: number; end: number } {
  const [startRaw = "00:00", endRaw = "00:00"] = range.split("-").map((value) => value.trim());
  return { start: timeStringToMinutes(startRaw), end: timeStringToMinutes(endRaw) };
}

function rangesOverlap(startMinutes: number, endMinutes: number, targetRange: string): boolean {
  const { start, end } = parseRange(targetRange);
  return startMinutes < end && start < endMinutes;
}

function sortSlots(slots: CoachScheduleSlot[]): CoachScheduleSlot[] {
  return [...slots].sort((a, b) => parseRange(a.time).start - parseRange(b.time).start);
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
}

export function InteractiveScheduleCalendar({
  scheduleData,
  onSessionUpdate,
  onUndo,
}: InteractiveScheduleCalendarProps) {
  const [schedule, setSchedule] = useState<CoachWeekDay[]>(() => cloneSchedule(scheduleData));
  const [draggedSlot, setDraggedSlot] = useState<{ slot: CoachScheduleSlot; fromDay: string } | null>(null);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [pendingChange, setPendingChange] = useState<PendingChangeState | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    // Reset when nguồn dữ liệu lịch thay đổi.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSchedule(cloneSchedule(scheduleData));
    setDraggedSlot(null);
    setPendingChange(null);
    setFormError(null);
    setHistory([]);
    setNotifications([]);
  }, [scheduleData]);

  const existingSlotsOnTargetDay = useMemo(() => {
    if (!pendingChange) {
      return [] as CoachScheduleSlot[];
    }
    const { toDay, fromDay, slot } = pendingChange;
    const targetDay = schedule.find((day) => day.day === toDay);
    if (!targetDay) {
      return [] as CoachScheduleSlot[];
    }
    return targetDay.slots.filter((current) => {
      if (toDay !== fromDay) {
        return true;
      }
      return !(
        current.title === slot.title &&
        current.time === slot.time &&
        current.location === slot.location
      );
    });
  }, [pendingChange, schedule]);

  const hasConflict = useMemo(() => {
    if (!pendingChange) {
      return false;
    }
    const startMinutes = timeStringToMinutes(pendingChange.newStart);
    const endMinutes = timeStringToMinutes(pendingChange.newEnd);
    if (!Number.isFinite(startMinutes) || !Number.isFinite(endMinutes)) {
      return false;
    }
    if (endMinutes <= startMinutes) {
      return true;
    }
    return existingSlotsOnTargetDay.some((slot) => rangesOverlap(startMinutes, endMinutes, slot.time));
  }, [existingSlotsOnTargetDay, pendingChange]);

  const handleDragStart = (slot: CoachScheduleSlot, fromDay: string) => {
    setDraggedSlot({ slot, fromDay });
  };

  const handleDrop = (toDay: string) => {
    if (!draggedSlot) {
      return;
    }
    const { slot, fromDay } = draggedSlot;
    const { start, end } = parseRange(slot.time);
    const newStart = `${String(Math.floor(start / 60)).padStart(2, "0")}:${String(start % 60).padStart(2, "0")}`;
    const newEnd = `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`;
    setPendingChange({
      slot,
      fromDay,
      toDay,
      newStart,
      newEnd,
      reason: "",
    });
    setFormError(null);
    setDraggedSlot(null);
    setHoveredDay(null);
  };

  const handleUndo = () => {
    const previous = history.at(-1);
    if (!previous) {
      return;
    }
    setHistory((prev) => prev.slice(0, -1));
    setSchedule(cloneSchedule(previous.snapshot));
    setNotifications((prev) => prev.filter((item) => item.id !== previous.change.id));
    onUndo?.(previous.change.id);
  };

  const confirmChange = () => {
    if (!pendingChange) {
      return;
    }

    const { slot, fromDay, toDay, newStart, newEnd, reason } = pendingChange;

    if (!reason.trim()) {
      setFormError("Vui lòng nhập lý do thay đổi để thông báo cho học viên.");
      return;
    }

    const startMinutes = timeStringToMinutes(newStart);
    const endMinutes = timeStringToMinutes(newEnd);

    if (endMinutes <= startMinutes) {
      setFormError("Giờ kết thúc phải lớn hơn giờ bắt đầu.");
      return;
    }

    if (hasConflict) {
      setFormError("Khung giờ này đang trùng với một buổi khác. Vui lòng chọn thời gian khác.");
      return;
    }

    const newTime = `${newStart} - ${newEnd}`;
    const updatedSlot: CoachScheduleSlot = { ...slot, time: newTime };
    const changeId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`;
    const changedAt = new Date().toISOString();
    const notifiedAt = new Date(Date.now() + 2 * 60 * 1000).toISOString();

    const changeDetail: SessionChangeDetail = {
      id: changeId,
      slot: updatedSlot,
      fromDay,
      toDay,
      previousTime: slot.time,
      newTime,
      reason: reason.trim(),
      changedAt,
      notifiedAt,
      channel: slot.location,
    };

    setHistory((prev) => [...prev, { snapshot: cloneSchedule(schedule), change: changeDetail }]);

    setSchedule((prev) =>
      prev.map((day) => {
        if (day.day !== fromDay && day.day !== toDay) {
          return day;
        }

        let nextSlots = day.slots.map((s) => ({ ...s }));

        if (day.day === fromDay) {
          nextSlots = nextSlots.filter(
            (current) =>
              !(
                current.title === slot.title &&
                current.time === slot.time &&
                current.location === slot.location
              )
          );
        }

        if (day.day === toDay) {
          nextSlots = sortSlots([...nextSlots, updatedSlot]);
        }

        return { ...day, slots: nextSlots };
      })
    );

    setNotifications((prev) => [
      {
        id: changeId,
        title: updatedSlot.title,
        detail: `${fromDay} → ${toDay} • ${newTime}`,
        reason: reason.trim(),
        timestamp: changedAt,
      },
      ...prev.slice(0, 2),
    ]);

    onSessionUpdate?.(changeDetail);
    setPendingChange(null);
    setFormError(null);
  };

  const cancelChange = () => {
    setPendingChange(null);
    setFormError(null);
  };

  const statusBadgeClass = {
    confirmed: "text-green-700 dark:text-green-300",
    pending: "text-amber-700 dark:text-amber-300",
    online: "text-blue-700 dark:text-blue-300",
    cancelled: "text-red-700 dark:text-red-300",
  };

  return (
    <div className="space-y-6">
      {notifications.length > 0 && (
        <div className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-4 dark:border-blue-500/50 dark:bg-blue-900/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-1 gap-3">
              <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-300" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-blue-900 dark:text-blue-100">Thông báo thay đổi đã xếp hàng gửi đi</p>
                <ul className="space-y-1">
                  {notifications.map((item) => (
                    <li key={item.id} className="text-blue-800 dark:text-blue-200">
                      <span className="font-semibold">{item.title}</span> · {item.detail}
                      <br />
                      <span className="text-xs text-blue-700/80 dark:text-blue-300/80">
                        Lý do: {item.reason} • {formatTimestamp(item.timestamp)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleUndo}
                className="inline-flex items-center gap-2 self-start rounded-full border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-700 transition hover:bg-white dark:border-blue-500 dark:text-blue-200 dark:hover:bg-blue-900/40"
              >
                <Undo2 className="h-3.5 w-3.5" /> Hoàn tác lần gần nhất
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-7">
        {schedule.map((day) => {
          const isHovered = hoveredDay === day.day;
          const isDragging = Boolean(draggedSlot);
          const columnClass = isHovered
            ? "border-zinc-900 bg-zinc-50 dark:border-zinc-200 dark:bg-zinc-900/50"
            : isDragging
              ? "border-blue-200 bg-blue-50/40 dark:border-blue-500/40 dark:bg-blue-900/10"
              : "border-zinc-200 dark:border-zinc-800";

          return (
            <div
              key={day.date}
              onDragOver={(event) => event.preventDefault()}
              onDragEnter={() => setHoveredDay(day.day)}
              onDragLeave={() => setHoveredDay((current) => (current === day.day ? null : current))}
              onDrop={() => handleDrop(day.day)}
              className={`rounded-lg border-2 transition ${columnClass}`}
            >
              <div className="border-b border-inherit bg-zinc-50 px-3 py-3 dark:bg-zinc-900/50">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">{day.day}</p>
                <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">{day.date}</p>
              </div>

              <div className="min-h-[320px] space-y-2 p-3">
                {day.slots.length === 0 ? (
                  <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-white/60 py-6 text-xs text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-500">
                    Thả buổi tập vào đây
                  </div>
                ) : (
                  day.slots.map((slot) => (
                    <div
                      key={`${slot.title}-${slot.time}-${day.day}`}
                      draggable
                      onDragStart={() => handleDragStart(slot, day.day)}
                      onDragEnd={() => {
                        setDraggedSlot(null);
                        setHoveredDay(null);
                      }}
                      className={`cursor-move rounded-lg border border-zinc-200 bg-white p-3 text-xs transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 ${
                        draggedSlot?.slot.title === slot.title && draggedSlot?.slot.time === slot.time ? "opacity-60" : ""
                      }`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <span className={`font-semibold uppercase tracking-wide ${statusBadgeClass[slot.status]}`}>
                          {slot.status === "confirmed"
                            ? "Đã xác nhận"
                            : slot.status === "pending"
                              ? "Chờ xác nhận"
                              : slot.status === "online"
                                ? "Online"
                                : "Đã hủy"}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{slot.title}</p>
                      <div className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5" /> {slot.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" /> {slot.location}
                        </div>
                      </div>
                      {(slot.status === "online" || slot.location.toLowerCase().includes("meet") || slot.location.toLowerCase().includes("zoom")) && (
                        <button
                          type="button"
                          className="mt-3 flex w-full items-center justify-center gap-1 rounded-full border border-zinc-200 px-2 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 dark:border-zinc-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                        >
                          <LinkIcon className="h-3.5 w-3.5" /> Link cuộc họp
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">💡 Mẹo sử dụng</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Kéo buổi tập sang ngày khác hoặc cập nhật thời lượng trực tiếp trên lịch. Mỗi lần thay đổi cần ghi lý do để hệ thống gửi thông báo trong vòng 5 phút.
        </p>
      </div>

      {pendingChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Xác nhận thay đổi buổi tập</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {pendingChange.slot.title} • {pendingChange.fromDay} → {pendingChange.toDay}
              </p>
            </div>

            <div className="space-y-5 px-6 py-6 text-sm text-zinc-700 dark:text-zinc-200">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Giờ bắt đầu</span>
                  <input
                    type="time"
                    value={pendingChange.newStart}
                    onChange={(event) =>
                      setPendingChange((current) =>
                        current
                          ? {
                              ...current,
                              newStart: event.target.value,
                            }
                          : current,
                      )
                    }
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-white"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Giờ kết thúc</span>
                  <input
                    type="time"
                    value={pendingChange.newEnd}
                    onChange={(event) =>
                      setPendingChange((current) =>
                        current
                          ? {
                              ...current,
                              newEnd: event.target.value,
                            }
                          : current,
                      )
                    }
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-white"
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  Lý do gửi cho học viên
                </span>
                <textarea
                  rows={3}
                  value={pendingChange.reason}
                  onChange={(event) =>
                    setPendingChange((current) =>
                      current
                        ? {
                            ...current,
                            reason: event.target.value,
                          }
                        : current,
                    )
                  }
                  placeholder="Ví dụ: học viên thay đổi lịch họp, cần chuyển sang 9h00"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-white"
                />
              </label>

              {hasConflict && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-900/20 dark:text-red-300">
                  Khung giờ mới trùng với {existingSlotsOnTargetDay.length > 0 ? "một" : ""} buổi đã có. Hãy chọn thời gian khác hoặc liên hệ admin để mở thêm slot.
                </div>
              )}

              {formError && (
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">{formError}</p>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cancelChange}
                  className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={confirmChange}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Lưu thay đổi và gửi thông báo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

