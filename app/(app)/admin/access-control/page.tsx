"use client";

import { useMemo, useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  accessControlMatrix,
  permissionAuditLog,
  permissionDefinitions,
  type AccessControlRow,
  type PermissionCode,
} from "@/data/mockData";

type RoleState = AccessControlRow;

export default function AccessControlPage() {
  const [roles, setRoles] = useState<RoleState[]>(() =>
    accessControlMatrix.map((role) => ({
      ...role,
      permissions: { ...role.permissions },
    })),
  );
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [auditEntries, setAuditEntries] = useState(() => [...permissionAuditLog]);

  const selectedRole = roles[selectedRoleIndex] ?? roles[0];
  const permissionMatrix = useMemo(() => permissionDefinitions, []);

  const togglePermission = (code: PermissionCode, nextValue: boolean) => {
    if (!selectedRole) {
      return;
    }

    if (selectedRole.role === "Chief Admin" && code === "approvePayments" && !nextValue) {
      setErrorMessage("Chief Admin bắt buộc giữ quyền duyệt thanh toán.");
      return;
    }

    setErrorMessage("");
    setFeedbackMessage("");
    setRoles((prev) =>
      prev.map((role, index) => {
        if (index !== selectedRoleIndex) {
          return role;
        }
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [code]: nextValue,
          },
        };
      }),
    );
  };

  const handleSave = () => {
    if (!selectedRole) {
      return;
    }
    setFeedbackMessage(`Đã lưu thay đổi cho ${selectedRole.role}.`);
    setAuditEntries((prev) => [
      {
        id: `audit-${Date.now()}`,
        actor: "Lan Nguyen",
        action: `Cập nhật quyền ${selectedRole.role}`,
        at: new Intl.DateTimeFormat("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
        }).format(new Date()),
      },
      ...prev,
    ]);
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Quản lý quyền truy cập</h2>
        <p className="text-sm text-zinc-500">
          Gán quyền chi tiết cho từng vai trò admin/phó admin và theo dõi lịch sử thay đổi.
        </p>
      </section>

      <SectionCard
        title="Cấu hình vai trò"
        description="Chọn vai trò ở cột bên trái để điều chỉnh quyền, sau đó lưu để cập nhật."
      >
        <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
          <div className="space-y-3 rounded-3xl border border-zinc-200 bg-white/80 p-4">
            {roles.map((role, index) => {
              const isActive = index === selectedRoleIndex;
              return (
                <button
                  key={role.role}
                  type="button"
                  onClick={() => setSelectedRoleIndex(index)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-indigo-500 bg-indigo-50/80 text-indigo-700 shadow"
                      : "border-zinc-200 text-zinc-700 hover:border-indigo-200 hover:bg-indigo-50/30"
                  }`}
                >
                  <p className="text-sm font-semibold">{role.role}</p>
                  <p className="text-xs text-zinc-500">{role.description}</p>
                </button>
              );
            })}
          </div>

          <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white/80 p-6">
            {selectedRole ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Vai trò</p>
                    <h3 className="text-xl font-semibold text-zinc-900">{selectedRole.role}</h3>
                    <p className="text-sm text-zinc-500">{selectedRole.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-zinc-900"
                  >
                    Lưu cấu hình
                  </button>
                </div>
                {feedbackMessage ? (
                  <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{feedbackMessage}</p>
                ) : null}
                {errorMessage ? (
                  <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">{errorMessage}</p>
                ) : null}
                <div className="space-y-4">
                  {permissionMatrix.map((permission) => {
                    const isEnabled = !!selectedRole.permissions[permission.code];
                    return (
                      <div
                        key={permission.code}
                        className="flex items-start justify-between rounded-2xl border border-zinc-200 bg-white/80 p-4"
                      >
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">{permission.label}</p>
                          <p className="text-xs text-zinc-500">{permission.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => togglePermission(permission.code, !isEnabled)}
                          className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
                            isEnabled ? "bg-emerald-500" : "bg-zinc-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${
                              isEnabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                          <span className="sr-only">Toggle {permission.label}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="mt-6 overflow-auto rounded-3xl border border-dashed border-zinc-200">
          <table className="min-w-full divide-y divide-zinc-200 text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3 text-left">Vai trò</th>
                {permissionMatrix.map((permission) => (
                  <th key={permission.code} className="px-4 py-3 text-left">
                    {permission.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {roles.map((role) => (
                <tr key={role.role}>
                  <td className="px-4 py-3 font-semibold text-zinc-900">{role.role}</td>
                  {permissionMatrix.map((permission) => (
                    <td key={permission.code} className="px-4 py-3">
                      {role.permissions[permission.code] ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Bật
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                          Tắt
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard
        title="Lịch sử thay đổi quyền"
        description="Theo dõi audit log để biết ai đã cập nhật quyền truy cập gần đây."
      >
        <ul className="space-y-3 text-sm text-zinc-600">
          {auditEntries.map((entry) => (
            <li key={entry.id} className="rounded-2xl border border-zinc-200 bg-white/90 p-4">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{entry.at}</span>
                <span className="font-semibold text-indigo-600">{entry.actor}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-zinc-900">{entry.action}</p>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
