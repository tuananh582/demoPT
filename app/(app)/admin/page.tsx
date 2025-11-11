"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/ui/DataTable";
import { MicroBarChart } from "@/components/charts/MicroBarChart";
import {
  adminNavItems,
  coachRecords,
  contentCatalog,
  packages,
  revenueSummary,
  traineeRecords,
  upcomingSchedules,
} from "@/data/mockData";

const timeframeOptions = [
  { key: "week", label: "Tuần" },
  { key: "month", label: "Tháng" },
  { key: "year", label: "Năm" },
] as const;

type TimeframeKey = (typeof timeframeOptions)[number]["key"];

export default function AdminPage() {
  const [timeframe, setTimeframe] = useState<TimeframeKey>("week");

  const revenueData = useMemo(() => revenueSummary[timeframe], [timeframe]);

  return (
    <AppShell title="Bảng điều khiển Admin" navItems={adminNavItems} roleGuard="admin">
      <div id="dashboard" className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <SectionCard
          title="Doanh thu tổng hợp"
          description="Theo dõi doanh thu phòng gym theo khoảng thời gian và so sánh hiệu suất."
          actions={
            <div className="inline-flex gap-2 rounded-2xl bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
              {timeframeOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setTimeframe(option.key)}
                  className={`rounded-xl px-3 py-1.5 font-semibold transition ${
                    timeframe === option.key
                      ? "bg-indigo-500 text-white shadow"
                      : "text-zinc-600 hover:bg-white dark:text-zinc-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          }
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-4">
              <StatCard label="Tổng doanh thu" value={revenueData.total} description={revenueData.change} variant="accent" />
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Nhận định nhanh</p>
                <ul className="mt-3 space-y-2 text-zinc-500 dark:text-zinc-400">
                  <li>• Lớp PT 1-1 chiếm 45% tổng doanh thu {timeframe === "week" ? "tuần" : timeframe === "month" ? "tháng" : "năm"}.</li>
                  <li>• Doanh thu online tăng 18% nhờ lớp HIIT livestream.</li>
                  <li>• Tỷ lệ hủy buổi giảm còn 3 buổi/{timeframe === "week" ? "tuần" : "tháng"}.</li>
                </ul>
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
              <MicroBarChart labels={revenueData.labels} values={revenueData.series} />
            </div>
          </div>
        </SectionCard>
        <div className="grid gap-4 md:grid-cols-2" aria-label="chỉ số nhanh">
          <StatCard label="Học viên đang hoạt động" value="134" description="+12 so với tháng trước" />
          <StatCard label="Coach đang phân công" value="18" description="Tỷ lệ phủ lịch 92%" />
          <StatCard label="Buổi online tuần này" value="28" description="5 buổi chờ xác nhận" />
          <StatCard label="Feedback 5★" value="87%" description="Trong 30 ngày gần nhất" />
        </div>
      </div>

      <SectionCard
        id="trainees"
        title="Quản lý học viên"
        description="Danh sách học viên cùng trạng thái và gói tập đang tham gia."
        actions={
          <button className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            + Thêm học viên
          </button>
        }
      >
        <DataTable
          columns={[
            { key: "name", header: "Họ tên" },
            { key: "email", header: "Email" },
            { key: "phone", header: "Số điện thoại" },
            { key: "status", header: "Trạng thái" },
            { key: "package", header: "Gói tập" },
          ]}
          data={traineeRecords}
          renderCell={(key, value) => {
            if (key === "status") {
              const statusValue = String(value);
              const badgeClass =
                statusValue === "Active"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                  : statusValue === "Trial"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200"
                    : "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200";
              return (
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
                  {statusValue}
                </span>
              );
            }
            return value as ReactNode;
          }}
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Lịch sử tiến độ và chỉ số đo InBody lưu ở tab chi tiết học viên.
        </p>
      </SectionCard>

      <SectionCard
        id="coaches"
        title="Quản lý huấn luyện viên"
        description="Theo dõi chuyên môn, lịch khả dụng và phân quyền coach."
        actions={
          <button className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            + Thêm coach
          </button>
        }
      >
        <DataTable
          columns={[
            { key: "name", header: "Tên" },
            { key: "email", header: "Email" },
            { key: "specialization", header: "Chuyên môn" },
            { key: "availability", header: "Lịch làm việc" },
          ]}
          data={coachRecords}
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Lịch phân công lớp nhóm và 1-1 hiển thị ở module lịch. Phân quyền coach tự động sau khi kích hoạt tài khoản.
        </p>
      </SectionCard>

      <SectionCard
        id="packages"
        title="Gói tập & sản phẩm"
        description="Quản lý danh mục gói tập, thời lượng và giá bán."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">{pkg.duration}</p>
                <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{pkg.name}</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{pkg.description}</p>
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{pkg.price}</p>
              <button className="mt-auto w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                Chỉnh sửa
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        id="content"
        title="Danh mục nội dung đào tạo"
        description="Quản lý bài tập, chương trình luyện tập và meal plan."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-500">Bài tập</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              {contentCatalog.exercises.map((exercise) => (
                <li key={exercise.name} className="rounded-xl border border-zinc-200 bg-white/60 p-3 dark:border-zinc-700 dark:bg-zinc-900/60">
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">{exercise.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{exercise.group}</p>
                  <a
                    href={exercise.video}
                    className="mt-2 inline-flex items-center text-xs font-medium text-indigo-500 hover:text-indigo-400"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link demo
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-500">Meal plan mẫu</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              {contentCatalog.meals.map((meal) => (
                <li key={meal.name} className="rounded-xl border border-zinc-200 bg-white/60 p-3 dark:border-zinc-700 dark:bg-zinc-900/60">
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">{meal.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{meal.calories}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Macro: {meal.macros}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-500">Program</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              {contentCatalog.programs.map((program) => (
                <li key={program.name} className="rounded-xl border border-zinc-200 bg-white/60 p-3 dark:border-zinc-700 dark:bg-zinc-900/60">
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">{program.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Mục tiêu: {program.goal}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Thời lượng: {program.duration}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        id="schedule"
        title="Lịch học & lớp online"
        description="Tổng hợp các buổi học sắp diễn ra cùng link online tương ứng."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {upcomingSchedules.map((session) => (
            <div
              key={session.title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-indigo-500">
                <span>{session.type === "one_on_one" ? "1-1" : session.type === "group" ? "Nhóm" : "Online"}</span>
                <span>{session.coach}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{session.title}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{session.time}</p>
              <a
                href={session.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center text-sm font-medium text-indigo-500 hover:text-indigo-400"
              >
                Mở link họp
              </a>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
          <p>Buổi 1-1 sẽ ở trạng thái <strong>chờ xác nhận</strong> cho đến khi coach xác nhận qua portal coach.</p>
          <p className="mt-1">Thông báo gửi tự động trong vòng 5 phút sau khi tạo lịch.</p>
        </div>
      </SectionCard>
    </AppShell>
  );
}
