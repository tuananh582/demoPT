"use client";

import { useState } from "react";
import { Trophy, Users, Calendar, TrendingUp, Flame, Award } from "lucide-react";

export default function ChallengesPage() {
  const [joined, setJoined] = useState<number[]>([1]);

  const challenges = [
    {
      id: 1,
      name: "7 Days Step Challenge",
      description: "Mục tiêu: 10,000 bước mỗi ngày trong 7 ngày",
      reward: "500 XP + Badge",
      participants: 234,
      daysLeft: 3,
      progress: 85,
      yourRank: 8,
      difficulty: "Dễ",
      starts: "2025-11-13",
      ends: "2025-11-19",
    },
    {
      id: 2,
      name: "Drink 2L Water Daily",
      description: "Uống ít nhất 2 lít nước mỗi ngày",
      reward: "300 XP + Badge",
      participants: 456,
      daysLeft: 5,
      progress: 60,
      yourRank: 42,
      difficulty: "Dễ",
      starts: "2025-11-10",
      ends: "2025-11-17",
    },
    {
      id: 3,
      name: "HIIT Warrior",
      description: "Hoàn thành 5 buổi HIIT Training",
      reward: "750 XP + Premium Badge",
      participants: 123,
      daysLeft: 10,
      progress: 40,
      yourRank: null,
      difficulty: "Cao",
      starts: "2025-11-15",
      ends: "2025-11-25",
    },
    {
      id: 4,
      name: "Yoga Master",
      description: "Tham gia 10 buổi yoga chuẩn",
      reward: "600 XP + Badge",
      participants: 189,
      daysLeft: 8,
      progress: 30,
      yourRank: null,
      difficulty: "Trung bình",
      starts: "2025-11-12",
      ends: "2025-11-22",
    },
  ];

  const handleJoinChallenge = (id: number) => {
    if (joined.includes(id)) {
      setJoined(joined.filter((cId) => cId !== id));
    } else {
      setJoined([...joined, id]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thử thách</h1>
        <p className="text-gray-600">Tham gia các thử thách để kiếm XP và badge</p>
      </div>

      {/* Active Challenges */}
      {joined.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Thử thách đang tham gia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges
              .filter((c) => joined.includes(c.id))
              .map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{challenge.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                    </div>
                    <Flame className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tiến độ: {challenge.progress}%</span>
                      <span className="font-bold text-indigo-600">Rank #{challenge.yourRank}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full transition-all"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{challenge.daysLeft} ngày còn lại</span>
                      <span className="font-bold">{challenge.participants} người tham gia</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className="w-full mt-4 py-2 rounded-lg bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition"
                  >
                    Hủy tham gia
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Available Challenges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Thử thách khác ({challenges.filter((c) => !joined.includes(c.id)).length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges
            .filter((c) => !joined.includes(c.id))
            .map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{challenge.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${
                      challenge.difficulty === "Dễ"
                        ? "bg-green-100 text-green-700"
                        : challenge.difficulty === "Trung bình"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {challenge.participants} người tham gia
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Kết thúc trong {challenge.daysLeft} ngày
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4" />
                    {challenge.reward}
                  </div>
                </div>

                <button
                  onClick={() => handleJoinChallenge(challenge.id)}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition"
                >
                  Tham gia thử thách
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Trophy className="w-7 h-7 text-yellow-500" />
          Bảng xếp hạng tuần này
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-900">#</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Tên</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Thử thách</th>
                <th className="text-right py-3 px-4 font-bold text-gray-900">Điểm</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <span className="text-lg">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {i === 3 ? "Bạn" : `Thành viên ${i + 1}`}
                  </td>
                  <td className="py-3 px-4 text-gray-600">7 Days Step</td>
                  <td className="py-3 px-4 text-right font-bold text-indigo-600">
                    {(10 - i) * 250} pts
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

