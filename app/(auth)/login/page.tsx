import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-indigo-100 px-4 py-10 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950">
      <div className="grid w-full max-w-5xl gap-10 rounded-[32px] border border-zinc-200 bg-white/90 p-8 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">GymFlow Console</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
            Đăng nhập để quản trị phòng gym và đồng hành cùng học viên
          </h1>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Trang quản trị tập trung cho admin và coach. Vui lòng sử dụng tài khoản đã được cấp quyền.
          </p>
          <LoginForm />
        </div>
        <div className="relative hidden overflow-hidden rounded-3xl bg-indigo-600/90 p-10 text-white shadow-inner lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]" aria-hidden />
          <div className="relative z-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Tổng quan tính năng</h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-indigo-50/90">
                <li>📊 Dashboard doanh thu đa chiều và KPI vận hành.</li>
                <li>🧑‍🎓 Quản lý học viên, tiến trình và lịch sử đo.</li>
                <li>🏋️ Điều phối huấn luyện viên, gói tập và lớp nhóm.</li>
                <li>🗓️ Lịch học online với link họp rõ ràng, xác nhận 1-1.</li>
                <li>🔔 Thông báo tự động cho coach và học viên.</li>
              </ul>
            </div>
            <div className="mt-10 space-y-2 text-xs text-indigo-50/70">
              <p>✅ Bảo mật JWT & phân quyền theo vai trò.</p>
              <p>✅ Responsive: sidebar bên trái (desktop), bottom nav (mobile).</p>
              <p>✅ Mock data mô phỏng môi trường thực tế.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
