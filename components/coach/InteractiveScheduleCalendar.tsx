
"use client";

import { useState } from "react";
import { Link as LinkIcon, MapPin, Clock, AlertCircle } from "lucide-react";

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

interface InteractiveScheduleCalendarProps {
  scheduleData: CoachWeekDay[];
  onSessionUpdate?: (movedSession: CoachScheduleSlot, fromDay: string, toDay: string) => void;
}

export function InteractiveScheduleCalendar({
  scheduleData,
  onSessionUpdate,
}: InteractiveScheduleCalendarProps) {
  const [schedule, setSchedule] = useState(scheduleData);
  const [draggedSlot, setDraggedSlot] = useState<{ slot: CoachScheduleSlot; fromDay: string } | null>(null);
  const [notifications, setNotifications] = useState<{ title: string; timestamp: string }[]>([]);

  const handleDragStart = (slot: CoachScheduleSlot, fromDay: string) => {
    setDraggedSlot({ slot, fromDay });
  };

  const handleDragEnd = () => {
    setDraggedSlot(null);
  };

  const handleDrop = (toDay: string) => {
    if (!draggedSlot || draggedSlot.fromDay === toDay) {
      handleDragEnd();
      return;
    }

    const { slot, fromDay } = draggedSlot;

    // Update schedule
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.day === fromDay) {
          return {
            ...day,
            slots: day.slots.filter((s) => s.title !== slot.title || s.time !== slot.time),
          };
        }
        if (day.day === toDay) {
          return {
            ...day,
            slots: [...day.slots, slot],
          };
        }
        return day;
      })
    );

    // Add notification
    setNotifications((prev) => [
      ...prev,
      {
        title: `Buổi '${slot.title}' đã chuyển từ ${fromDay} sang ${toDay}`,
        timestamp: new Date().toISOString(),
      },
    ]);

    // Trigger callback
    if (onSessionUpdate) {
      onSessionUpdate(slot, fromDay, toDay);
    }

    handleDragEnd();
  };

  const statusColor = {
    confirmed: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
    pending: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
    online: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
    cancelled: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
  };

  const statusBadgeColor = {
    confirmed: "text-green-700 dark:text-green-300",
    pending: "text-yellow-700 dark:text-yellow-300",
    online: "text-blue-700 dark:text-blue-300",
    cancelled: "text-red-700 dark:text-red-300",
  };

  return (
    <div className="space-y-6">
      {/* Notifications Alert */}
      {notifications.length > 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                Đã chuyển buổi tập thành công
              </p>
              <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                Thông báo sẽ được gửi đến học viên trong vòng 5 phút.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Schedule Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {schedule.map((dayData) => (
          <div
            key={dayData.date}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={() => handleDrop(dayData.day)}
            className={`rounded-lg border-2 transition ${
              draggedSlot
                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                : "border-zinc-200 dark:border-zinc-800"
            }`}
          >
            {/* Day Header */}
            <div className="border-b border-inherit bg-zinc-50 px-3 py-3 dark:bg-zinc-900/50">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                {dayData.day}
              </p>
              <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {dayData.date.split("/")[0]}
              </p>
            </div>

            {/* Sessions */}
            <div className="min-h-[300px] space-y-2 p-3">
              {dayData.slots.length === 0 ? (
                <div className="flex h-full items-center justify-center py-6">
                  <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">
                    Không có buổi tập
                  </p>
                </div>
              ) : (
                dayData.slots.map((slot) => (
                  <div
                    key={`${slot.title}-${slot.time}`}
                    draggable
                    onDragStart={() => handleDragStart(slot, dayData.day)}
                    onDragEnd={handleDragEnd}
                    className={`cursor-move rounded-lg border p-3 transition hover:shadow-md ${
                      statusColor[slot.status]
                    } ${
                      draggedSlot?.slot.title === slot.title && draggedSlot?.slot.time === slot.time
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    {/* Status Badge */}
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span className={`text-xs font-semibold ${statusBadgeColor[slot.status]}`}>
                        {slot.status === "confirmed"
                          ? "✓ Xác nhận"
                          : slot.status === "pending"
                          ? "⏳ Chờ xác nhận"
                          : slot.status === "online"
                          ? "🌐 Online"
                          : "✕ Hủy"}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="line-clamp-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {slot.title}
                    </p>

                    {/* Time & Location */}
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        {slot.time}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        {slot.location}
                      </div>
                    </div>

                    {/* Online Link */}
                    {(slot.status === "online" ||
                      slot.location.includes("Meet") ||
                      slot.location.includes("Zoom")) && (
                      <button className="mt-3 flex w-full items-center justify-center gap-1 rounded bg-white/50 px-2 py-1 text-xs font-medium text-blue-600 transition hover:bg-white dark:bg-zinc-800/50 dark:text-blue-400 dark:hover:bg-zinc-800">
                        <LinkIcon className="h-3 w-3" />
                        Link cuộc họp
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          💡 Mẹo sử dụng:
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Kéo thả buổi tập giữa các ngày để sắp xếp lại lịch. Thông báo sẽ tự động gửi đến học viên
          khi bạn thay đổi lịch.
        </p>
      </div>
    </div>
  );
}

