"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { packages as packageCatalog, traineeRecords } from "@/data/mockData";

import type { TraineeRecord, TraineeStatus } from "@/data/mockData";

const traineeStatusOptions: TraineeStatus[] = ["Lead", "Trial", "Active"];
const traineePackageOptions = Array.from(
  new Set([
    ...packageCatalog.map((item) => item.name),
    ...traineeRecords.map((item) => item.package),
  ]),
);

const emptyFormState: TraineeRecord = {
  name: "",
  email: "",
  phone: "",
  status: "Lead",
  package: "",
};

export default function AdminTraineesPage() {
  const [trainees, setTrainees] = useState<TraineeRecord[]>(() => [...traineeRecords]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<TraineeRecord>(() => ({ ...emptyFormState }));

  const closeForm = () => {
    setShowForm(false);
    setFormError("");
    setEditingIndex(null);
    setFormState({ ...emptyFormState });
  };

  const openCreateForm = () => {
    setFormState({ ...emptyFormState });
    setEditingIndex(null);
    setFormError("");
    setShowForm(true);
  };

  const startEdit = (index: number) => {
    setFormState({ ...trainees[index] });
    setEditingIndex(index);
    setFormError("");
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const trainee = trainees[index];
    if (window.confirm(`Bạn có chắc muốn xóa học viên ${trainee.name}?`)) {
      setTrainees((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
      if (editingIndex === index) {
        closeForm();
      }
    }
  };

  const handleChange = (field: keyof TraineeRecord, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedPhone = formState.phone.trim();
    const trimmedPackage = formState.package.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedPackage) {
      setFormError("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    if (editingIndex !== null) {
      setTrainees((prev) =>
        prev.map((item, index) =>
          index === editingIndex
            ? {
                ...formState,
                name: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone,
                package: trimmedPackage,
              }
            : item
        )
      );
    } else {
      setTrainees((prev) => [
        {
          ...formState,
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          package: trimmedPackage,
        },
        ...prev,
      ]);
    }
    closeForm();
  };

  const columns = useMemo(
    () => [
      { key: "name" as const, header: "Họ tên" },
      { key: "email" as const, header: "Email" },
      { key: "phone" as const, header: "Số điện thoại" },
      { key: "status" as const, header: "Trạng thái" },
      { key: "package" as const, header: "Gói tập" },
    ],
    []
  );

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Quản lý học viên</h2>
        <p className="text-sm text-zinc-500">
          Danh sách học viên cùng gói tập đang tham gia và trạng thái hiện tại.
        </p>
      </section>

      <SectionCard
        title="Danh sách học viên"
        description="Các trường chính phục vụ tra cứu nhanh, chi tiết được quản lý ở trang hồ sơ."
        actions={
          <button
            type="button"
            onClick={showForm ? closeForm : openCreateForm}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
          >
            {showForm ? "Đóng form" : "Thêm học viên"}
          </button>
        }
      >
        {showForm ? (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-lg border border-dashed border-zinc-300 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Họ tên
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
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Số điện thoại
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Trạng thái
                <select
                  value={formState.status}
                  onChange={(event) => handleChange("status", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                >
                  {traineeStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Gói tập
              <select
                value={formState.package}
                onChange={(event) => handleChange("package", event.target.value)}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Chọn gói tập
                </option>
                {traineePackageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                {editingIndex !== null ? "Cập nhật học viên" : "Lưu học viên"}
              </button>
            </div>
          </form>
        ) : null}

        <DataTable
          columns={columns}
          data={trainees}
          actionColumn={{
            header: "Thao tác",
            className: "w-40",
            render: (_row, index) => (
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(index)}
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                >
                  Xóa
                </button>
              </div>
            ),
          }}
        />
        <p className="text-xs text-zinc-500">
          Các chỉ số đo lường chi tiết được ghi nhận ở mục tiến trình riêng của từng học viên.
        </p>
      </SectionCard>
    </>
  );
}
