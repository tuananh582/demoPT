"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Zap,
  Target,
  Calendar,
  Trophy,
  Heart,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react";

export default function DashboardPage() {
  const [todayCompletion] = useState(65);
  const [streak] = useState(12);
  const [xp] = useState(1250);
  const [todayWorkouts] = useState([
    {
      id: 1,
      name: "Cardio buổi sáng",
      duration: 30,
      completed: true,
      xp: 50,
    },
    {
      id: 2,
      name: "Tạ tay trung bình",
      duration: 45,
      completed: false,
      xp: 100,
    },
    {
      id: 3,
      name: "Yoga thư giãn",
      duration: 20,
      completed: false,
      xp: 30,
    },
  ]);

  const [upcomingSessions] = useState([
    {
      id: 1,
      name: "Lớp Yoga sáng",
      time: "06:30",
      instructor: "Thanh Hương",
      capacity: "12/20",
      type: "virtual",
    },
    {
      id: 2,
      name: "Lớp tạ chiều",
      time: "17:00",
      instructor: "Tuấn Kiệt",
      capacity: "18/20",
      type: "in-studio",
    },
  ]);

  const [challenges] = useState([
    {
      id: 1,
      name: "7 Days Step Challenge",
      participants: 234,
      yourRank: 8,
      daysLeft: 3,
      progress: 85,
    },
    {
      id: 2,
      name: "Drink 2L Water Daily",
      participants: 456,
      yourRank: 42,
      daysLeft: 5,
      progress: 60,
    },
  ]);

  const handleCompleteWorkout = (id: number) => {
    console.log("Completed workout:", id);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Chào buổi sáng, Nguyễn Văn A! 👋</h2>
            <p className="text-white/80">
              Bạn đang trên đúng lộ trình. Hãy tiếp tục giữ động lực!
            </p>
          </div>
          <div className="hidden lg:block">
            <Zap className="w-24 h-24 text-yellow-300 opacity-50" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Streak */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-3">
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
              +2 hôm nay
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Streak hôm nay</p>
          <p className="text-4xl font-bold text-gray-900">{streak}</p>
          <p className="text-xs text-gray-500 mt-2">ngày liên tiếp</p>
        </div>

        {/* Today's Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-8 h-8 text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              {todayCompletion}%
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">Tiến độ hôm nay</p>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full transition-all duration-500"
              style={{ width: `${todayCompletion}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">2 của 3 bài tập hoàn thành</p>
        </div>

        {/* XP Points */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
              +150 hôm nay
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">XP Points</p>
          <p className="text-4xl font-bold text-gray-900">{xp}</p>
          <p className="text-xs text-gray-500 mt-2">Cấp độ 8</p>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-3">
            <Heart className="w-8 h-8 text-pink-600" />
            <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded">
              Mục tiêu
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Tăng cơ bắp</p>
          <p className="text-2xl font-bold text-gray-900">75%</p>
          <p className="text-xs text-gray-500 mt-2">Đạt được 3 tháng</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Workouts */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Kế hoạch hôm nay</h3>
            <Link
              href="/student/plan"
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              Xem tất cả
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {todayWorkouts.map((workout, index) => (
              <div
                key={workout.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition ${
                  workout.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200 hover:border-indigo-300"
                }`}
              >
                <button
                  onClick={() => handleCompleteWorkout(workout.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    workout.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 hover:border-indigo-600"
                  }`}
                >
                  {workout.completed && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </button>

                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      workout.completed
                        ? "text-green-900 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {workout.name}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {workout.duration} phút
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-gray-900">{workout.xp} XP</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition">
            Thêm bài tập khác
          </button>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Lớp sắp tới</h3>
            <Link
              href="/student/schedule"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              <Calendar className="w-5 h-5" />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900">{session.name}</p>
                    <p className="text-sm text-gray-600">{session.instructor}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      session.type === "virtual"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {session.type === "virtual" ? "Trực tuyến" : "Trực tiếp"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-indigo-600 font-semibold">{session.time}</p>
                  <p className="text-gray-600">{session.capacity}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:shadow-lg transition">
              Xem thêm lớp
            </button>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Challenge */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-1">Thử thách hôm nay</h3>
              <p className="text-white/80">Tham gia "7 Days Step Challenge"</p>
            </div>
            <Trophy className="w-12 h-12 text-yellow-300" />
          </div>

          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Tiến độ</span>
              <span className="text-sm font-bold">85%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-yellow-300 h-full rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>

          <p className="text-sm text-white/80 mb-4">
            Bạn đang xếp hạng 8/234. Cố gắng thêm 100 bước để vượt lên trên!
          </p>

          <button className="w-full py-3 rounded-lg bg-white text-pink-600 font-bold hover:bg-gray-50 transition">
            Xem chi tiết
          </button>
        </div>

        {/* All Challenges */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Thử thách hoạt động</h3>

          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-gray-900">{challenge.name}</p>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    Top {challenge.yourRank}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {challenge.participants} người tham gia
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-gray-600 whitespace-nowrap">
                    {challenge.daysLeft}d còn lại
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition text-sm">
            Xem tất cả thử thách
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/student/messages"
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition flex flex-col items-center gap-3 text-center"
        >
          <MessageSquare className="w-8 h-8 text-indigo-600" />
          <span className="font-semibold text-sm text-gray-900">Tin nhắn</span>
          <span className="text-xs text-gray-500">2 tin nhắn mới</span>
        </Link>

        <Link
          href="/student/schedule"
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition flex flex-col items-center gap-3 text-center"
        >
          <Calendar className="w-8 h-8 text-purple-600" />
          <span className="font-semibold text-sm text-gray-900">Lịch lớp</span>
          <span className="text-xs text-gray-500">5 lớp tuần này</span>
        </Link>

        <Link
          href="/student/progress"
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition flex flex-col items-center gap-3 text-center"
        >
          <TrendingUp className="w-8 h-8 text-green-600" />
          <span className="font-semibold text-sm text-gray-900">Tiến độ</span>
          <span className="text-xs text-gray-500">Xem chi tiết</span>
        </Link>

        <Link
          href="/student/community"
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition flex flex-col items-center gap-3 text-center"
        >
          <Users className="w-8 h-8 text-pink-600" />
          <span className="font-semibold text-sm text-gray-900">Cộng đồng</span>
          <span className="text-xs text-gray-500">423 người online</span>
        </Link>
      </div>
    </div>
  );
}

