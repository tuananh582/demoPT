"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Heart, Filter, Search, CheckCircle } from "lucide-react";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState("2025-11-13");
  const [filterType, setFilterType] = useState("all");
  const [bookings, setBookings] = useState<{
    [key: number]: boolean;
  }>({});

  const sessions = [
    {
      id: 1,
      name: "Yoga sáng",
      time: "06:30 - 07:30",
      instructor: "Thanh Hương",
      level: "Beginner",
      capacity: "12/20",
      location: "Studio A",
      type: "in-studio",
      booked: true,
      description: "Khóa yoga nhẹ nhàng, hoàn hảo để bắt đầu ngày mới",
    },
    {
      id: 2,
      name: "HIIT Training",
      time: "07:00 - 08:00",
      instructor: "Tuấn Kiệt",
      level: "Intermediate",
      capacity: "18/20",
      location: "Virtual",
      type: "virtual",
      booked: false,
      description: "Bài tập HIIT yêu cầu cao, tăng cơ bắp và đốt calo nhanh",
    },
    {
      id: 3,
      name: "Cycling Indoor",
      time: "17:00 - 18:00",
      instructor: "Minh Châu",
      level: "Advanced",
      capacity: "15/20",
      location: "Studio B",
      type: "in-studio",
      booked: false,
      description: "Lớp tập xe đạp cạnh tranh, kiểm thử giới hạn của bạn",
    },
    {
      id: 4,
      name: "Pilates Core",
      time: "18:30 - 19:30",
      instructor: "Linh Nhi",
      level: "Beginner",
      capacity: "10/15",
      location: "Virtual",
      type: "virtual",
      booked: false,
      description: "Tập pilates để cơ lõi khỏe, cải thiện tư thế",
    },
    {
      id: 5,
      name: "CrossFit",
      time: "19:00 - 20:00",
      instructor: "Đức Hà",
      level: "Advanced",
      capacity: "20/20",
      location: "Studio C",
      type: "in-studio",
      booked: false,
      description: "Bài tập CrossFit toàn thân, cần sức mạnh và độ bền",
    },
    {
      id: 6,
      name: "Meditation",
      time: "20:00 - 20:30",
      instructor: "Minh Khôi",
      level: "All Levels",
      capacity: "8/30",
      location: "Virtual",
      type: "virtual",
      booked: false,
      description: "Thiền để thư giãn, giảm stress sau một ngày làm việc",
    },
  ];

  const filteredSessions = sessions.filter((session) => {
    if (filterType === "all") return true;
    return session.type === filterType;
  });

  const handleBookSession = (id: number) => {
    setBookings({
      ...bookings,
      [id]: !bookings[id],
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-50 text-green-700 border-green-200";
      case "Intermediate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Advanced":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getCapacityColor = (capacity: string) => {
    const [current, total] = capacity.split("/").map(Number);
    const percentage = (current / total) * 100;
    if (percentage > 75) return "text-red-600";
    if (percentage > 50) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch lớp</h1>
          <p className="text-gray-600">Đặt lớp yêu thích của bạn</p>
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-4 flex-wrap">
          <Filter className="w-5 h-5 text-gray-600" />
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterType === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tất cả lớp
          </button>
          <button
            onClick={() => setFilterType("in-studio")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterType === "in-studio"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Trực tiếp
          </button>
          <button
            onClick={() => setFilterType("virtual")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterType === "virtual"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Trực tuyến
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => {
          const isBooked = bookings[session.id] || session.booked;
          return (
            <div
              key={session.id}
              className={`bg-white rounded-2xl shadow-lg border-2 transition hover:shadow-xl ${
                isBooked
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{session.name}</h3>
                      {isBooked && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          Đã đặt
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full border ${getLevelColor(
                          session.level
                        )}`}
                      >
                        {session.level}
                      </span>
                    </div>
                    <p className="text-gray-600">{session.description}</p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-xs text-gray-500">Thời gian</p>
                      <p className="font-semibold">{session.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">Địa điểm</p>
                      <p className="font-semibold">{session.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <div>
                      <p className="text-xs text-gray-500">Giáo viên</p>
                      <p className="font-semibold">{session.instructor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className={`w-5 h-5 ${getCapacityColor(session.capacity)}`} />
                    <div>
                      <p className="text-xs text-gray-500">Chỗ trống</p>
                      <p className={`font-semibold ${getCapacityColor(session.capacity)}`}>
                        {session.capacity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleBookSession(session.id)}
                    className={`flex-1 py-3 rounded-lg font-bold transition ${
                      isBooked
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                    }`}
                  >
                    {isBooked ? "Hủy đặt lớp" : "Đặt lớp ngay"}
                  </button>
                  <button className="px-6 py-3 rounded-lg border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Confirmation */}
      {Object.values(bookings).some(Boolean) && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white rounded-lg shadow-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="font-bold">
              Bạn đã đặt {Object.values(bookings).filter(Boolean).length} lớp
            </p>
            <p className="text-sm text-green-50">Kiểm tra email để xác nhận</p>
          </div>
        </div>
      )}
    </div>
  );
}

