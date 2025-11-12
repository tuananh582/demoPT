"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { accountRecords } from "@/data/mockData";

type AccountRecord = {
  name: string;
  email: string;
  role: string;
  status: string;
};

const roleOptions = ["Admin", "Coach", "Học viên"];
const statusOptions = ["Hoạt động", "Dùng thử", "Vô hiệu"];

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<AccountRecord[]>(() => [...accountRecords]);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [formState, setFormState] = useState<AccountRecord>(() => ({
    name: "",
    email: "",
    role: "Học viên",
    status: "Hoạt động",
  }));

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setFormError("");
    setFeedbackMessage("");
  };

  const handleChange = (field: keyof AccountRecord, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();

    if (!trimmedName || !trimmedEmail) {
      setFormError("Tên và email là bắt buộc.");
      return;
    }

    setAccounts((prev) => [
      {
        ...formState,
        name: trimmedName,
        email: trimmedEmail,
      },
      ...prev,
    ]);
    setFormState({ name: "", email: "", role: "Học viên", status: "Hoạt động" });
    setFormError("");
    setShowForm(false);
    setFeedbackMessage("Tạo tài khoản thành công.");
  };

  const handleExport = () => {
    if (accounts.length === 0) {
      setFeedbackMessage("Không có dữ liệu để xuất.");
      return;
    }

    const headers = ["Tên", "Email", "Vai trò", "Trạng thái"];
    const rows = accounts.map((account) => [account.name, account.email, account.role, account.status]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([`\ufeff${csvContent}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `accounts-${new Date().toISOString().slice(0, 10)}.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setFeedbackMessage("Đã xuất danh sách tài khoản.");
  };

  const columns = useMemo(
    () => [
      { key: "name" as const, header: "Tên" },
      { key: "email" as const, header: "Email" },
      { key: "role" as const, header: "Vai trò" },
      { key: "status" as const, header: "Trạng thái" },
    ],
    []
  );

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Quản lý tài khoản</h2>
        <p className="text-sm text-zinc-500">
          Theo dõi quyền truy cập và tình trạng hoạt động của tài khoản hệ thống.
        </p>
      </section>

      <SectionCard
        title="Danh sách tài khoản"
        description="Danh sách này hỗ trợ rà soát nhanh để cấp quyền hoặc vô hiệu hóa."
        actions={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleForm}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
            >
              {showForm ? "Đóng form" : "Tạo tài khoản"}
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              Xuất danh sách
            </button>
          </div>
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
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Vai trò
                <select
                  value={formState.role}
                  onChange={(event) => handleChange("role", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                >
                  {roleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Trạng thái
                <select
                  value={formState.status}
                  onChange={(event) => handleChange("status", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
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
                Lưu tài khoản
              </button>
            </div>
          </form>
        ) : null}

        {feedbackMessage ? <p className="mb-4 text-sm text-emerald-600">{feedbackMessage}</p> : null}
        <DataTable columns={columns} data={accounts} />
        <p className="text-xs text-zinc-500">
          Các thay đổi quan trọng cần ghi nhận log để đảm bảo truy vết an toàn.
        </p>
      </SectionCard>
    </>
  );
}
