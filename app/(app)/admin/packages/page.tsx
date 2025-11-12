"use client";

import { useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import { packages as initialPackages } from "@/data/mockData";

type PackageItem = {
  name: string;
  duration: string;
  price: string;
  description: string;
};

const emptyPackage: PackageItem = {
  name: "",
  duration: "",
  price: "",
  description: "",
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>(() => [...initialPackages]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormState, setAddFormState] = useState<PackageItem>(emptyPackage);
  const [addError, setAddError] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormState, setEditFormState] = useState<PackageItem>(emptyPackage);
  const [editError, setEditError] = useState("");

  const handleAddChange = (field: keyof PackageItem, value: string) => {
    setAddFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditChange = (field: keyof PackageItem, value: string) => {
    setEditFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleAddForm = () => {
    setShowAddForm((prev) => !prev);
    setAddError("");
    if (showAddForm) {
      setAddFormState(emptyPackage);
    }
  };

  const validatePackage = (pkg: PackageItem) => {
    return pkg.name.trim() && pkg.duration.trim() && pkg.price.trim() && pkg.description.trim();
  };

  const handleAddSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!validatePackage(addFormState)) {
      setAddError("Vui lòng nhập đầy đủ tên, thời lượng, giá và mô tả.");
      return;
    }

    setPackages((prev) => [
      {
        name: addFormState.name.trim(),
        duration: addFormState.duration.trim(),
        price: addFormState.price.trim(),
        description: addFormState.description.trim(),
      },
      ...prev,
    ]);
    setAddFormState(emptyPackage);
    setAddError("");
    setShowAddForm(false);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditFormState({ ...packages[index] });
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditError("");
  };

  const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!validatePackage(editFormState)) {
      setEditError("Vui lòng điền đủ thông tin gói.");
      return;
    }

    setPackages((prev) =>
      prev.map((item, index) =>
        index === editingIndex
          ? {
              name: editFormState.name.trim(),
              duration: editFormState.duration.trim(),
              price: editFormState.price.trim(),
              description: editFormState.description.trim(),
            }
          : item
      )
    );
    setEditingIndex(null);
    setEditError("");
  };

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Quản lý gói tập</h2>
        <p className="text-sm text-zinc-500">
          Cập nhật thông tin gói tập, thời lượng và giá để phù hợp với chiến lược kinh doanh.
        </p>
      </section>

      <SectionCard
        title="Danh mục gói"
        description="Các gói đang mở bán. Chỉnh sửa giúp cập nhật nội dung và giá ngay lập tức."
        actions={
          <button
            type="button"
            onClick={toggleAddForm}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
          >
            {showAddForm ? "Đóng form" : "Thêm gói mới"}
          </button>
        }
      >
        {showAddForm ? (
          <form onSubmit={handleAddSubmit} className="mb-6 space-y-4 rounded-lg border border-dashed border-zinc-300 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Tên gói
                <input
                  type="text"
                  value={addFormState.name}
                  onChange={(event) => handleAddChange("name", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Thời lượng
                <input
                  type="text"
                  value={addFormState.duration}
                  onChange={(event) => handleAddChange("duration", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  placeholder="Ví dụ: 12 tuần"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Giá bán
              <input
                type="text"
                value={addFormState.price}
                onChange={(event) => handleAddChange("price", event.target.value)}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Mô tả
              <textarea
                value={addFormState.description}
                onChange={(event) => handleAddChange("description", event.target.value)}
                className="min-h-[96px] rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                required
              />
            </label>
            {addError ? <p className="text-sm text-red-600">{addError}</p> : null}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={toggleAddForm}
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Lưu gói mới
              </button>
            </div>
          </form>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((item, index) => (
            <article key={`${item.name}-${index}`} className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4">
              {editingIndex === index ? (
                <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                  <div>
                    <label className="flex flex-col gap-1 text-sm text-zinc-700">
                      Tên gói
                      <input
                        type="text"
                        value={editFormState.name}
                        onChange={(event) => handleEditChange("name", event.target.value)}
                        className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                        required
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1 text-sm text-zinc-700">
                    Thời lượng
                    <input
                      type="text"
                      value={editFormState.duration}
                      onChange={(event) => handleEditChange("duration", event.target.value)}
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-zinc-700">
                    Mô tả
                    <textarea
                      value={editFormState.description}
                      onChange={(event) => handleEditChange("description", event.target.value)}
                      className="min-h-[96px] rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-zinc-700">
                    Giá bán
                    <input
                      type="text"
                      value={editFormState.price}
                      onChange={(event) => handleEditChange("price", event.target.value)}
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      required
                    />
                  </label>
                  {editError ? <p className="text-sm text-red-600">{editError}</p> : null}
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">{item.duration}</p>
                    <h3 className="mt-1 text-lg font-semibold text-zinc-900">{item.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-600">{item.description}</p>
                  <p className="text-base font-semibold text-zinc-900">{item.price}</p>
                  <button
                    type="button"
                    onClick={() => startEdit(index)}
                    className="mt-auto w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                  >
                    Chỉnh sửa
                  </button>
                </>
              )}
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
