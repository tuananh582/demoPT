"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { coachRecords } from "@/data/mockData";

import type { CoachRecord } from "@/data/mockData";

export default function AdminCoachesPage() {
  const [coaches, setCoaches] = useState<CoachRecord[]>(() => [...coachRecords]);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<CoachRecord>(() => ({
    name: "",
    email: "",
    specialization: "",
    availability: "",
  }));

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setFormError("");
  };

  const handleChange = (field: keyof CoachRecord, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedSpecialization = formState.specialization.trim();
    const trimmedAvailability = formState.availability.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSpecialization || !trimmedAvailability) {
      setFormError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    setCoaches((prev) => [
      {
        name: trimmedName,
        email: trimmedEmail,
        specialization: trimmedSpecialization,
        availability: trimmedAvailability,
      },
      ...prev,
    ]);
    setFormState({ name: "", email: "", specialization: "", availability: "" });
    setFormError("");
    setShowForm(false);
  };

  const columns = useMemo(
    () => [
      { key: "name" as const, header: "Tên" },
      { key: "email" as const, header: "Email" },
      { key: "specialization" as const, header: "Chuyên môn" },
      { key: "availability" as const, header: "Lịch làm việc" },
    ],
    []
  );

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Quản lý huấn luyện viên</h2>
        <p className="text-sm text-zinc-500">
          Theo dõi chuyên môn, lịch làm việc và trạng thái hoạt động của từng coach.
        </p>
      </section>

      <SectionCard
        title="Danh sách huấn luyện viên"
        description="Thông tin nền tảng để phân bổ lịch và phân quyền phù hợp."
        actions={
          <button
            type="button"
            onClick={toggleForm}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
          >
            {showForm ? "Đóng form" : "Thêm coach"}
          </button>
        }
      >
        {showForm ? (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-lg border border-dashed border-zinc-300 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Tên
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Email
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Chuyên môn
              <input
                type="text"
                value={formState.specialization}
                onChange={(event) => handleChange("specialization", event.target.value)}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Lịch làm việc
              <input
                type="text"
                value={formState.availability}
                onChange={(event) => handleChange("availability", event.target.value)}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                placeholder="Ví dụ: Thứ 2-6 (7:00 - 17:00)"
                required
              />
            </label>
            {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={toggleForm}
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Lưu coach
              </button>
            </div>
          </form>
        ) : null}

        <DataTable columns={columns} data={coaches} />
        <p className="text-xs text-zinc-500">
          Lịch chi tiết theo buổi được xem ở mục Lịch học để tránh trùng lịch hoặc quá tải.
        </p>
      </SectionCard>
    </>
  );
}
