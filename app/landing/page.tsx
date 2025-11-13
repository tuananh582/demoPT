import Link from "next/link";
import {
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
  Heart,
  Calendar,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-white font-bold text-xl">FitCampus</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition"
            >
              Đăng nhập
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-2 rounded-lg bg-white text-purple-600 font-bold hover:bg-gray-50 transition"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Hành trình fitness của bạn
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                bắt đầu từ đây
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              FitCampus là nền tảng wellness toàn diện cho sinh viên. Tập luyện cá nhân hóa, lịch
              lớp linh hoạt, cộng đồng động lực và hỗ trợ từ mentor chuyên nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="px-8 py-4 rounded-lg bg-white text-purple-600 font-bold text-lg hover:bg-gray-50 transition shadow-xl"
              >
                Bắt đầu miễn phí
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold text-lg hover:bg-white/30 transition border border-white/30"
              >
                Xem thêm →
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-md h-96 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-24 h-24 text-white/80 mx-auto mb-4" />
                <p className="text-white/70 text-lg">Theo dõi tiến độ thực tế</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Tính năng nổi bật
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-white/40 transition group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lịch biểu linh hoạt</h3>
              <p className="text-white/70">
                Đặt lịch lớp phù hợp với thời khóa biểu của bạn. Hỗ trợ đầy đủ các múi giờ.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-white/40 transition group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Kế hoạch cá nhân hóa</h3>
              <p className="text-white/70">
                Nhận kế hoạch luyện tập và dinh dưỡng được thiết kế dựa trên mục tiêu của bạn.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-white/40 transition group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Theo dõi tiến độ</h3>
              <p className="text-white/70">
                Xem biểu đồ chi tiết về thành tích của bạn với so sánh mục tiêu và dự báo.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-white/40 transition group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Gamification & Thử thách</h3>
              <p className="text-white/70">
                Kiếm XP, huy hiệu và cạnh tranh với bạn bè trong thử thách hằng tuần.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-white/40 transition group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cộng đồng & Mentor</h3>
              <p className="text-white/70">
                Kết nối với bạn cùng lớp, nhận hỗ trợ từ mentor chuyên nghiệp và cộng đồng.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-white/40 transition group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hỗ trợ 24/7</h3>
              <p className="text-white/70">
                Gửi câu hỏi hoặc yêu cầu hỗ trợ bất cứ lúc nào. Mentor sẵn sàng giúp bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Sẵn sàng bắt đầu hành trình của bạn?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Tham gia hàng ngàn sinh viên đang tập luyện thông minh với FitCampus.
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-10 py-4 rounded-lg bg-white text-purple-600 font-bold text-lg hover:bg-gray-50 transition shadow-2xl"
          >
            Đăng ký ngay – Miễn phí
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-8 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-white/60 text-sm">
          <p>&copy; 2025 FitCampus. Tất cả quyền được bảo vệ.</p>
        </div>
      </footer>
    </div>
  );
}

