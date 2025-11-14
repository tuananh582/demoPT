"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { Calendar, Download, LineChart as LineChartIcon } from "lucide-react";

import {
  coachStatisticRecords,
  coachStatisticTrend,
  coachStatisticAlerts,
  coachStatisticExportHistory,
  type CoachStatisticRecord,
  type CoachStatisticAlert,
  type CoachStatisticExportEntry,
} from "@/data/mockData";

type StatusFilter = "all" | CoachStatisticRecord["status"];

const STATUS_OPTIONS: StatusFilter[] = ["all", "Lead", "Trial", "Active"];
const COLORS = ["#0f172a", "#2563eb", "#f97316", "#16a34a", "#0ea5e9"];

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [groupBy, setGroupBy] = useState<"trainee" | "coach">("trainee");
  const [exportHistory, setExportHistory] = useState<CoachStatisticExportEntry[]>(coachStatisticExportHistory);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" });

  const filteredRecords = useMemo(() => {
    return coachStatisticRecords.filter((record) => statusFilter === "all" || record.status === statusFilter);
  }, [statusFilter]);

  const groupedData = useMemo(() => {
    if (groupBy === "trainee") {
      return filteredRecords.map((record) => ({
        key: record.trainee,
        label: record.trainee,
        sessions: record[timeRange].sessions,
        target: record[timeRange].target,
        completionRate: record.goalCompletionRate,
        rating: record.averageRating,
        reviews: record.reviewCount,
      }));
    }

    const aggregates = new Map<string, { sessions: number; target: number; ratingSum: number; ratingCount: number; completionSum: number; trainees: number }>();
    filteredRecords.forEach((record) => {
      const current = aggregates.get(record.coach) ?? {
        sessions: 0,
        target: 0,
        ratingSum: 0,
        ratingCount: 0,
        completionSum: 0,
        trainees: 0,
      };
      current.sessions += record[timeRange].sessions;
      current.target += record[timeRange].target;
      current.completionSum += record.goalCompletionRate;
      current.trainees += 1;
      if (record.averageRating > 0) {
        current.ratingSum += record.averageRating;
        current.ratingCount += 1;
      }
      aggregates.set(record.coach, current);
    });

    return Array.from(aggregates.entries()).map(([coach, value]) => ({
      key: coach,
      label: coach,
      sessions: value.sessions,
      target: value.target,
      completionRate: value.trainees ? Math.round(value.completionSum / value.trainees) : 0,
      rating: value.ratingCount ? Number((value.ratingSum / value.ratingCount).toFixed(1)) : 0,
      reviews: value.ratingCount,
    }));
  }, [filteredRecords, groupBy, timeRange]);

  const summary = useMemo(() => {
    const totalSessions = groupedData.reduce((sum, item) => sum + item.sessions, 0);
    const totalTarget = groupedData.reduce((sum, item) => sum + item.target, 0);
    const averageCompletion = groupedData.length
      ? Math.round(groupedData.reduce((sum, item) => sum + item.completionRate, 0) / groupedData.length)
      : 0;
    const averageRating = groupedData.length
      ? Number(
          (
            groupedData.reduce((sum, item) => sum + (Number.isFinite(item.rating) ? item.rating : 0), 0) /
            groupedData.length
          ).toFixed(1)
        )
      : 0;

    return {
      totalSessions,
      totalTarget,
      completionDelta: totalTarget ? Math.round((totalSessions / totalTarget) * 100) : 0,
      averageCompletion,
      averageRating,
    };
  }, [groupedData]);

  const pieData = useMemo(() => {
    if (groupBy === "coach") {
      return groupedData.map((item) => ({ name: item.label, value: item.completionRate }));
    }
    return filteredRecords.map((record) => ({ name: record.trainee, value: record.goalCompletionRate }));
  }, [filteredRecords, groupedData, groupBy]);

  const activeAlerts = useMemo(() => {
    const allowedTrainees = new Set(filteredRecords.map((record) => record.trainee));
    return coachStatisticAlerts.filter((alert) => allowedTrainees.size === 0 || allowedTrainees.has(alert.trainee));
  }, [filteredRecords]);

  const handleExport = (format: CoachStatisticExportEntry["format"]) => {
    const filters: string[] = [
      `Phạm vi: ${timeRange === "week" ? "Tuần" : timeRange === "month" ? "Tháng" : "Năm"}`,
      `Nhóm: ${groupBy === "trainee" ? "Theo học viên" : "Theo huấn luyện viên"}`,
    ];
    if (statusFilter !== "all") {
      filters.push(`Trạng thái: ${statusFilter}`);
    }
    if (dateRange.start || dateRange.end) {
      filters.push(`Khoảng ngày: ${dateRange.start || "•"} → ${dateRange.end || "•"}`);
    }

    const entry: CoachStatisticExportEntry = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
      format,
      rangeLabel: `${timeRange === "week" ? "Tuần" : timeRange === "month" ? "Tháng" : "Năm"} hiện tại`,
      createdAt: new Date().toISOString(),
      createdBy: "Minh Tran",
      filters,
    };
    setExportHistory((prev) => [entry, ...prev]);

    if (format === "csv") {
      if (typeof window === "undefined") {
        return;
      }
      const header = ["Tên", "Nhóm", "Buổi hoàn thành", "Mục tiêu", "Tỷ lệ hoàn thành", "Rating", "Số review"];
      const rows = groupedData.map((item) => [
        item.label,
        groupBy === "trainee" ? "Học viên" : "HLV",
        item.sessions.toString(),
        item.target.toString(),
        `${item.completionRate}%`,
        item.rating ? item.rating.toString() : "—",
        item.reviews ? item.reviews.toString() : "0",
      ]);
      const csv = [header, ...rows]
        .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
        .join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `coach-statistics-${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Thống kê chi tiết</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Theo dõi số buổi tập, tỷ lệ hoàn thành mục tiêu và đánh giá chất lượng theo học viên hoặc huấn luyện viên.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {(["week", "month", "year"] as const).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setTimeRange(range)}
              className={`rounded-full px-4 py-2 font-medium transition ${
                timeRange === range
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {range === "week" ? "Tuần" : range === "month" ? "Tháng" : "Năm"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-zinc-500" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(event) => setDateRange((prev) => ({ ...prev, start: event.target.value }))}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
            <span className="text-zinc-500">→</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(event) => setDateRange((prev) => ({ ...prev, end: event.target.value }))}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div className="flex gap-2">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  statusFilter === status
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {status === "all" ? "Tất cả" : status}
              </button>
            ))}
          </div>

          <div className="inline-flex gap-2 rounded-full border border-zinc-200 p-1 text-xs font-semibold dark:border-zinc-700">
            {(["trainee", "coach"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setGroupBy(option)}
                className={`rounded-full px-3 py-1 transition ${
                  groupBy === option
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {option === "trainee" ? "Theo học viên" : "Theo huấn luyện viên"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleExport("pdf")}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <LineChartIcon className="h-4 w-4" /> Xuất báo cáo (PDF)
          </button>
          <button
            type="button"
            onClick={() => handleExport("csv")}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Download className="h-4 w-4" /> Xuất dữ liệu thô
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Buổi hoàn thành</p>
          <p className="mt-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">{summary.totalSessions}</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Mục tiêu: {summary.totalTarget}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Tỷ lệ hoàn thành trung bình</p>
          <p className="mt-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">{summary.averageCompletion}%</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">So với mục tiêu: {summary.completionDelta}%</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Rating trung bình</p>
          <p className="mt-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">{summary.averageRating}/5</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Bao gồm cả buổi 1-1 và online</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Số buổi vs mục tiêu ({groupBy === "trainee" ? "Học viên" : "Huấn luyện viên"})</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={groupedData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="label" stroke="#71717a" tick={{ fontSize: 12 }} />
              <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "none" }} labelStyle={{ color: "#fafafa" }} />
              <Legend />
              <Bar dataKey="sessions" fill="#0f172a" name="Hoàn thành" radius={[6, 6, 0, 0]} />
              <Bar dataKey="target" fill="#d4d4d8" name="Mục tiêu" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Xu hướng hoàn thành theo tuần</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={coachStatisticTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="label" stroke="#71717a" tick={{ fontSize: 12 }} />
              <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "none" }} labelStyle={{ color: "#fafafa" }} />
              <Legend />
              <Line type="monotone" dataKey="sessions" name="Buổi hoàn thành" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="completionRate" name="Tỷ lệ hoàn thành (%)" stroke="#0f172a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Đánh giá chất lượng buổi tập
            </h3>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {groupedData.length} mục
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="px-6 py-3">{groupBy === "trainee" ? "Học viên" : "Huấn luyện viên"}</th>
                  <th className="px-6 py-3">Buổi hoàn thành</th>
                  <th className="px-6 py-3">Mục tiêu</th>
                  <th className="px-6 py-3">Tỷ lệ hoàn thành</th>
                  <th className="px-6 py-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {groupedData.map((item) => (
                  <tr key={item.key} className="border-b border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800">
                    <td className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.label}</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.sessions}</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.target}</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.completionRate}%</td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.rating ? `${item.rating}/5` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Tỷ lệ hoàn thành theo {groupBy === "trainee" ? "học viên" : "huấn luyện viên"}</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" labelLine={false} label={({ name, value }) => `${name}: ${value}%`}>
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{ backgroundColor: "#18181b", border: "none" }} labelStyle={{ color: "#fafafa" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Cảnh báo cần chú ý</h3>
          {activeAlerts.length === 0 ? (
            <p className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
              Không có cảnh báo nào cho bộ lọc hiện tại.
            </p>
          ) : (
            <div className="space-y-3">
              {activeAlerts.map((alert: CoachStatisticAlert) => (
                <div
                  key={alert.id}
                  className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{alert.trainee}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        alert.level === "critical"
                          ? "border border-red-300 text-red-700 dark:border-red-500/50 dark:text-red-300"
                          : alert.level === "warning"
                            ? "border border-amber-300 text-amber-700 dark:border-amber-500/50 dark:text-amber-300"
                            : "border border-blue-300 text-blue-700 dark:border-blue-500/50 dark:text-blue-300"
                      }`}
                    >
                      {alert.level === "critical" ? "Nguy cấp" : alert.level === "warning" ? "Cảnh báo" : "Thông tin"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{alert.message}</p>
                  <p className="mt-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">Đề xuất: {alert.recommendedAction}</p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    Cập nhật: {new Date(alert.updatedAt).toLocaleString("vi-VN")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Lịch sử xuất báo cáo</h3>
          {exportHistory.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Chưa có báo cáo nào được xuất.</p>
          ) : (
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              {exportHistory.slice(0, 6).map((entry) => (
                <li key={entry.id} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {entry.rangeLabel} · {entry.format.toUpperCase()}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {new Date(entry.createdAt).toLocaleString("vi-VN")} bởi {entry.createdBy}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">{entry.filters.length} bộ lọc</span>
                  </div>
                  {entry.filters.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-500 dark:text-zinc-400">
                      {entry.filters.map((filter) => (
                        <li key={filter}>{filter}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

