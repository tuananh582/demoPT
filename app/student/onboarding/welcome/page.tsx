"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Heart,
} from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    {
      id: "profile",
      title: "Hoàn thiện hồ sơ",
      description: "Thêm ảnh đại diện và thông tin cá nhân",
      icon: Heart,
      status: "done",
    },
    {
      id: "health",
      title: "Kiểm tra sức khỏe",
      description: "Trả lời câu hỏi về tình trạng sức khỏe",
      action: "/student/onboarding/health-check",
    },
    {
      id: "goals",
      title: "Đặt mục tiêu",
      description: "Xác định mục tiêu fitness của bạn",
      action: "/student/onboarding/goals",
    },
    {
      id: "intro",
      title: "Lớp giới thiệu",
      description: "Đặt lịch lớp giới thiệu miễn phí",
      action: "/student/onboarding/intro-class",
    },
  ];

  const handleCompleteStep = (stepId: string, action?: string) => {
    setCompletedSteps([...completedSteps, stepId]);
    if (action) {
      router.push(action);
    }
  };

  const handleSkip = () => {
    router.push("/student/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Background Animation */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Chào mừng đến với FitCampus 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Chúng tôi rất vui được có bạn! Hãy hoàn thành một vài bước để bắt đầu hành trình wellness
            của bạn.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-4 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon || Award;
            const isCompleted = completedSteps.includes(step.id) || step.status === "done";

            return (
              <div
                key={step.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition group cursor-pointer"
                onClick={() =>
                  step.action && !isCompleted
                    ? handleCompleteStep(step.id, step.action)
                    : null
                }
              >
                <div className="flex items-start gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg transition ${
                        isCompleted
                          ? "bg-green-100 text-green-600"
                          : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-7 h-7" />
                      ) : (
                        index + 1
                      )}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>

                  {/* Action */}
                  {!isCompleted && step.action && (
                    <div className="flex-shrink-0 group-hover:translate-x-1 transition">
                      <ArrowRight className="w-6 h-6 text-indigo-600" />
                    </div>
                  )}
                  {isCompleted && (
                    <div className="flex-shrink-0">
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        Đã hoàn thành
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <BookOpen className="w-8 h-8 text-indigo-600 mb-3" />
            <h4 className="font-bold text-gray-900 mb-2">Học video</h4>
            <p className="text-sm text-gray-600">
              Truy cập thư viện 100+ video tập luyện chất lượng cao.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <Users className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-bold text-gray-900 mb-2">Cộng đồng</h4>
            <p className="text-sm text-gray-600">
              Kết nối với 5000+ sinh viên tập luyện cùng bạn.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <Award className="w-8 h-8 text-pink-600 mb-3" />
            <h4 className="font-bold text-gray-900 mb-2">Phần thưởng</h4>
            <p className="text-sm text-gray-600">
              Kiếm XP, huy hiệu và cạnh tranh trong thử thách.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSkip}
            className="px-8 py-4 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition"
          >
            Bỏ qua định hướng
          </button>
          <button
            onClick={() => handleCompleteStep("health", "/student/onboarding/health-check")}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            Bắt đầu <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

