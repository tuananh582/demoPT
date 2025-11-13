"use client";

import { useState } from "react";
import { User, Lock, Bell, Shield, LogOut } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: "profile", label: "Hồ sơ", icon: User },
          { id: "security", label: "Bảo mật", icon: Lock },
          { id: "notifications", label: "Thông báo", icon: Bell },
          { id: "privacy", label: "Riêng tư", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h2>

          <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              A
            </div>
            <div>
              <button className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">
                Thay ảnh đại diện
              </button>
              <p className="text-xs text-gray-500 mt-2">JPG, PNG, hoặc GIF. Tối đa 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Họ và tên</label>
              <input
                type="text"
                value="Nguyễn Văn A"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
              <input
                type="email"
                value="a@university.edu"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Số điện thoại</label>
              <input
                type="text"
                placeholder="+84 9xx xxx xxx"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Mục tiêu fitness</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 outline-none text-gray-900">
                <option>Giảm cân</option>
                <option>Tăng cơ bắp</option>
                <option>Tăng sức bền</option>
              </select>
            </div>
          </div>

          <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">
            Lưu thay đổi
          </button>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Bảo mật</h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-gray-900 mb-2">Mật khẩu</h3>
              <p className="text-gray-600 text-sm mb-4">Thay đổi mật khẩu của bạn</p>
              <button className="px-6 py-2 border border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition">
                Thay đổi mật khẩu
              </button>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-gray-900 mb-2">Xác thực hai yếu tố</h3>
              <p className="text-gray-600 text-sm mb-4">Bảo vệ tài khoản của bạn bằng xác thực hai yếu tố</p>
              <button className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition">
                Bật xác thực 2FA
              </button>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Thiết bị & phiên làm việc</h3>
              <p className="text-gray-600 text-sm mb-4">Quản lý các thiết bị đăng nhập của bạn</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-gray-900">Chrome trên Mac - Hôm nay</p>
                <p className="text-xs text-gray-500">192.168.1.1</p>
              </div>
              <button className="text-red-600 font-bold text-sm hover:text-red-700">Đăng xuất tất cả thiết bị</button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Thông báo</h2>

          <div className="space-y-4">
            {[
              {
                title: "Nhắc nhở lớp",
                description: "Nhận thông báo trước khi lớp của bạn bắt đầu",
              },
              {
                title: "Tin nhắn mới",
                description: "Nhận thông báo khi mentor hoặc bạn bè gửi tin nhắn",
              },
              {
                title: "Thay đổi kế hoạch",
                description: "Nhận thông báo khi mentor cập nhật kế hoạch của bạn",
              },
              {
                title: "Thử thách mới",
                description: "Nhận thông báo khi có thử thách mới phù hợp",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-bold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === "privacy" && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Riêng tư</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-bold text-gray-900">Hiển thị tiến độ công khai</p>
                <p className="text-sm text-gray-600">Cho phép cộng đồng xem tiến độ của bạn</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-bold text-gray-900">Cho phép tin nhắn từ bất kỳ ai</p>
                <p className="text-sm text-gray-600">Nếu tắt, chỉ mentor có thể nhắn</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-900 mb-4">Dữ liệu và quyền riêng tư</h3>
            <div className="space-y-2">
              <button className="block text-indigo-600 hover:text-indigo-700 font-medium">
                📥 Tải xuống dữ liệu của tôi
              </button>
              <button className="block text-red-600 hover:text-red-700 font-medium">
                🗑️ Xóa tài khoản vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

