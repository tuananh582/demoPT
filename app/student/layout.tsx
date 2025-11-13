"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  TrendingUp,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Heart,
  Trophy,
  Zap,
} from "lucide-react";
import { ProtectedRoute } from "@/app/components/protected-route";
import { useAuth } from "@/app/context/auth-context";

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/student/dashboard", icon: Home },
    { name: "Kế hoạch hôm nay", href: "/student/plan", icon: Zap },
    { name: "Lịch lớp", href: "/student/schedule", icon: Calendar },
    { name: "Tiến độ", href: "/student/progress", icon: TrendingUp },
    { name: "Thử thách", href: "/student/challenges", icon: Trophy },
    { name: "Cộng đồng", href: "/student/community", icon: Users },
    { name: "Tin nhắn", href: "/student/messages", icon: MessageSquare },
    { name: "Cài đặt", href: "/student/settings", icon: Settings },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-indigo-600 to-purple-600 text-white transition-all duration-300 fixed h-screen overflow-y-auto z-40`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <Link href="/student/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <Heart className="w-6 h-6" fill="white" />
              <span>FitCampus</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-white/20 border-l-2 border-white"
                    : "hover:bg-white/10"
                }`}
                title={!sidebarOpen ? item.name : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-left">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-white/60 truncate">{user?.email}</p>
              </div>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 mt-2 rounded-lg hover:bg-white/10 transition text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Top Bar */}
        <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {navItems.find((item) => item.href === pathname)?.name || "FitCampus"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <p className="font-semibold">Ngày hôm nay</p>
              <p className="text-gray-500">
                {new Date().toLocaleDateString("vi-VN", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 overflow-auto">
          {children}
        </div>
      </main>
      </div>
    </ProtectedRoute>
  );
}

