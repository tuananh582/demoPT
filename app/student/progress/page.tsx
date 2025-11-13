"use client";

import { useState } from "react";
import { TrendingUp, Download, Calendar, BarChart3, LineChart, Target } from "lucide-react";

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("month");
  const [metrics] = useState([
    { name: "Cân nặng", value: 72, unit: "kg", change: -2.5, target: 70 },
    { name: "Mỡ cơ thể", value: 18, unit: "%", change: -1.2, target: 15 },
    { name: "Bắp tay", value: 35, unit: "cm", change: 1.5, target: 38 },
    { name: "Vòng eo", value: 82, unit: "cm", change: -3, target: 78 },
  ]);

  const [achievements] = useState([
    {
      id: 1,
      title: "Kỳ đầu tiên",
      description: "Hoàn thành lớp đầu tiên của bạn",
      icon: "🎯",
      earned: true,
      date: "2025-10-15",
    },
    {
      id: 2,
      title: "7 ngày liên tiếp",
      description: "Tập luyện 7 ngày liên tiếp",
      icon: "🔥",
      earned: true,
      date: "2025-10-22",
    },
    {
      id: 3,
      title: "100 XP Master",
      description: "Kiếm được 100 XP trong một ngày",
      icon: "⚡",
      earned: true,
      date: "2025-11-05",
    },
    {
      id: 4,
      title: "Challenge Winner",
      description: "Chiến thắng 1 thử thách",
      icon: "🏆",
      earned: false,
      date: null,
    },
    {
      id: 5,
      title: "Community Star",
      description: "Giúp đỡ 10 bạn trong cộng đồng",
      icon: "⭐",
      earned: false,
      date: null,
    },
    {
      id: 6,
      title: "Milestone 500",
      description: "Kiếm được 500 XP tổng cộng",
      icon: "💎",
      earned: false,
      date: null,
    },
  ]);

  const [workoutData] = useState([
    { week: "Tuần 1", workouts: 4, hours: 6.5 },
    { week: "Tuần 2", workouts: 5, hours: 8 },
    { week: "Tuần 3", workouts: 6, hours: 9.5 },
    { week: "Tuần 4", workouts: 7, hours: 11 },
  ]);

  return (
    <div className="space-y-8">
      {/* Header with Export */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tiến độ của bạn</h1>
          <p className="text-gray-600">Theo dõi hành trình fitness của bạn</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="year">Năm này</option>
          </select>
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Xuất PDF
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-1">{metric.name}</p>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                  <span className="text-lg text-gray-500 ml-1">{metric.unit}</span>
                </p>
              </div>
              <span
                className={`text-sm font-bold ${
                  metric.change < 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change < 0 ? "↓" : "↑"} {Math.abs(metric.change)}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Tiến độ</span>
                <span className="text-gray-900 font-bold">
                  {Math.round(((metric.value - metric.target) / (metric.target * 0.2)) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(0, ((metric.value - metric.target) / (metric.target * 0.2)) * 100))}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">Mục tiêu: {metric.target}{metric.unit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Số lần tập luyện
          </h3>
          <div className="space-y-4">
            {workoutData.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{data.week}</span>
                  <span className="text-sm font-bold text-indigo-600">{data.workouts} lần</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full"
                    style={{ width: `${(data.workouts / 7) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hours Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <LineChart className="w-6 h-6 text-purple-600" />
            Giờ tập luyện
          </h3>
          <div className="space-y-4">
            {workoutData.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{data.week}</span>
                  <span className="text-sm font-bold text-purple-600">{data.hours} giờ</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-full"
                    style={{ width: `${(data.hours / 12) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Target className="w-7 h-7 text-pink-600" />
          Huy hiệu & Thành tựu
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-6 rounded-xl border-2 text-center transition ${
                achievement.earned
                  ? "bg-yellow-50 border-yellow-200 shadow-lg"
                  : "bg-gray-50 border-gray-200 opacity-50"
              }`}
            >
              <div className="text-5xl mb-3">{achievement.icon}</div>
              <h4 className="font-bold text-gray-900 mb-1">{achievement.title}</h4>
              <p className="text-xs text-gray-600 mb-3">{achievement.description}</p>
              {achievement.earned && (
                <p className="text-xs text-yellow-700 font-semibold flex items-center justify-center gap-1">
                  ✓ Đã nhận {achievement.date}
                </p>
              )}
              {!achievement.earned && (
                <p className="text-xs text-gray-500">Chưa mở khóa</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">Thống kê tổng hợp</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-white/80 text-sm font-medium mb-2">Tổng giờ tập</p>
            <p className="text-4xl font-bold">37.5</p>
            <p className="text-xs text-white/60 mt-1">trong 4 tuần</p>
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium mb-2">Lớp hoàn thành</p>
            <p className="text-4xl font-bold">22</p>
            <p className="text-xs text-white/60 mt-1">lớp</p>
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium mb-2">Huy hiệu kiếm</p>
            <p className="text-4xl font-bold">3</p>
            <p className="text-xs text-white/60 mt-1">huy hiệu</p>
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium mb-2">XP kiếm</p>
            <p className="text-4xl font-bold">380</p>
            <p className="text-xs text-white/60 mt-1">XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}

