"use client";

import { Zap, CheckCircle, Clock, AlertCircle, MoreVertical } from "lucide-react";

export default function PlanPage() {
  const todayPlan = [
    {
      id: 1,
      title: "Cardio buổi sáng",
      type: "Workout",
      duration: 30,
      completed: true,
      xp: 50,
      intensity: "Trung bình",
    },
    {
      id: 2,
      title: "Bữa sáng tăng cơ",
      type: "Nutrition",
      duration: 15,
      completed: false,
      xp: 20,
      calories: 400,
    },
    {
      id: 3,
      title: "Bài tập tạ tay",
      type: "Workout",
      duration: 45,
      completed: false,
      xp: 100,
      intensity: "Cao",
    },
    {
      id: 4,
      title: "Yoga thư giãn",
      type: "Recovery",
      duration: 20,
      completed: false,
      xp: 30,
      difficulty: "Dễ",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <p className="text-gray-600 text-sm mb-2">Tiến độ hôm nay</p>
          <p className="text-4xl font-bold text-gray-900 mb-3">50%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: "50%" }}></div>
          </div>
          <p className="text-xs text-gray-500">2 của 4 bài hoàn thành</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <p className="text-gray-600 text-sm mb-2">XP hôm nay</p>
          <p className="text-4xl font-bold text-yellow-500 mb-3">200/200</p>
          <div className="text-xs text-gray-500">Hoàn thành tất cả để mở khóa bonus</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <p className="text-gray-600 text-sm mb-2">Streak</p>
          <p className="text-4xl font-bold text-orange-500 mb-3">12 ngày</p>
          <div className="text-xs text-gray-500">Cứ tiếp tục giữ vậy!</div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kế hoạch hôm nay</h2>

        <div className="space-y-4">
          {todayPlan.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-4 p-6 rounded-xl border-2 transition ${
                task.completed
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200 hover:border-indigo-300"
              }`}
            >
              <button
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition ${
                  task.completed
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300 hover:border-indigo-600"
                }`}
              >
                {task.completed && <CheckCircle className="w-5 h-5 text-white" />}
              </button>

              <div className="flex-1">
                <h3
                  className={`text-lg font-bold mb-1 ${
                    task.completed ? "text-green-900 line-through" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded">{task.type}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {task.duration}분
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    {task.xp} XP
                  </span>
                  {task.intensity && (
                    <span className={`px-2 py-1 rounded ${
                      task.intensity === "Cao" ? "bg-red-100 text-red-700" :
                      task.intensity === "Trung bình" ? "bg-orange-100 text-orange-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {task.intensity}
                    </span>
                  )}
                  {task.calories && <span>🔥 {task.calories} cal</span>}
                </div>
              </div>

              <button className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-lg transition">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 flex gap-4 items-start">
        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-blue-900 mb-1">💡 Mẹo hôm nay</h3>
          <p className="text-blue-800">
            Hoàn thành tất cả các bài tập trước 8PM để nhận bonus 50 XP và duy trì streak!
          </p>
        </div>
      </div>
    </div>
  );
}

