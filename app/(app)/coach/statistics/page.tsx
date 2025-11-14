
"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Download, Calendar } from "lucide-react";

// Mock data for statistics
const weeklySessionsData = [
  { trainee: "Gia Han", sessions: 3, target: 3, week: "W1" },
  { trainee: "Quang Huy", sessions: 2, target: 3, week: "W1" },
  { trainee: "Linh Chi", sessions: 0, target: 2, week: "W1" },
  { trainee: "Gia Han", sessions: 3, target: 3, week: "W2" },
  { trainee: "Quang Huy", sessions: 3, target: 3, week: "W2" },
  { trainee: "Linh Chi", sessions: 1, target: 2, week: "W2" },
];

const completionRateData = [
  { name: "Gia Han", value: 92 },
  { name: "Quang Huy", value: 68 },
  { name: "Linh Chi", value: 0 },
];

const sessionQualityData = [
  { trainee: "Gia Han", rating: 4.8, reviews: 12 },
  { trainee: "Quang Huy", rating: 4.2, reviews: 8 },
  { trainee: "Linh Chi", rating: 0, reviews: 0 },
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [selectedTrainee, setSelectedTrainee] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Thống kê chi tiết
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Xem tổng quan các chỉ số hiệu suất huấn luyện
        </p>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          {(["week", "month", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                timeRange === range
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {range === "week" ? "Tuần" : range === "month" ? "Tháng" : "Năm"}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            Tổng buổi tập (tuần này)
          </p>
          <p className="mt-3 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            8
          </p>
          <p className="mt-2 text-xs text-green-600 dark:text-green-400">
            +2 so với tuần trước
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            Tỷ lệ hoàn thành trung bình
          </p>
          <p className="mt-3 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            73%
          </p>
          <p className="mt-2 text-xs text-orange-600 dark:text-orange-400">
            3 học viên theo dõi
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            Rating chất lượng trung bình
          </p>
          <p className="mt-3 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            4.3/5
          </p>
          <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
            Từ 20 đánh giá
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Weekly Sessions Chart */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Số buổi tập theo tuần
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklySessionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="trainee" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
              <Legend />
              <Bar dataKey="sessions" fill="#10b981" name="Hoàn thành" />
              <Bar dataKey="target" fill="#d1d5db" name="Mục tiêu" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Rate Pie Chart */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Tỷ lệ hoàn thành mục tiêu (%)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={completionRateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {completionRateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quality Assessment Table */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Đánh giá chất lượng buổi tập
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Học viên
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Số đánh giá
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {sessionQualityData.map((item) => (
                <tr
                  key={item.trainee}
                  className="border-b border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                >
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {item.trainee}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        {item.rating}
                      </span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {item.reviews} lượt
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.rating >= 4.5
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : item.rating >= 4
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                      }`}
                    >
                      {item.rating === 0 ? "Chưa đánh giá" : "Tốt"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

