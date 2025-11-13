"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Heart, Mail, Lock, User, CheckCircle, AlertCircle } from "lucide-react";
import { register } from "@/app/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    goal: "",
    experience: "",
    consent: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      setLoading(false);
      return;
    }

    if (!formData.consent) {
      setError("Bạn phải đồng ý với điều khoản dịch vụ");
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData.email, formData.password, formData.fullName);

      if (result.success && result.user) {
        // Set session cookie
        document.cookie = `fitcampus_session=${JSON.stringify({ user: result.user, token: result.user.id })};path=/`;
        router.push("/student/dashboard");
      } else {
        setError(result.error || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FitCampus</h1>
          <p className="text-gray-600">Bắt đầu hành trình wellness của bạn</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition ${
                s <= step ? "bg-indigo-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-6">
          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin cơ bản</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition outline-none text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email sinh viên
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@university.edu"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition outline-none text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition outline-none text-gray-900 placeholder:text-gray-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition outline-none text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Fitness Profile */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hồ sơ fitness</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mục tiêu của bạn
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "weight_loss", label: "Giảm cân 💪" },
                      { value: "muscle_gain", label: "Tăng cơ bắp 🏋️" },
                      { value: "endurance", label: "Tăng sức bền 🏃" },
                      { value: "health", label: "Cải thiện sức khỏe ❤️" },
                    ].map((goal) => (
                      <label key={goal.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="goal"
                          value={goal.value}
                          checked={formData.goal === goal.value}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-indigo-600"
                        />
                        <span className="text-gray-700 font-medium">{goal.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Kinh nghiệm tập luyện
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition outline-none text-gray-900"
                    required
                  >
                    <option value="">Chọn mức độ kinh nghiệm...</option>
                    <option value="beginner">Người mới bắt đầu</option>
                    <option value="intermediate">Trung bình</option>
                    <option value="advanced">Nâng cao</option>
                    <option value="expert">Chuyên gia</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Agreement */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Xác nhận thông tin</h2>

                <div className="bg-indigo-50 rounded-lg p-4 space-y-3 border border-indigo-200">
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Tên: {formData.fullName}</p>
                      <p className="text-sm text-gray-600">{formData.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Mục tiêu: {formData.goal}</p>
                      <p className="text-sm text-gray-600">Kinh nghiệm: {formData.experience}</p>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    Tôi đồng ý với{" "}
                    <Link href="#" className="text-indigo-600 hover:underline">
                      Điều khoản dịch vụ
                    </Link>
                    , 
                    <Link href="#" className="text-indigo-600 hover:underline ml-1">
                      Chính sách bảo mật
                    </Link>
                    {" "}và {" "}
                    <Link href="#" className="text-indigo-600 hover:underline">
                      Tuyên bố y tế
                    </Link>
                  </span>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition"
                >
                  Quay lại
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition disabled:opacity-70"
              >
                {loading
                  ? "Đang xử lý..."
                  : step === 3
                    ? "Hoàn thành đăng ký"
                    : "Tiếp tục"}
              </button>
            </div>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-bold">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

