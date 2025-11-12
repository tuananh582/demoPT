"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import { contentCatalog } from "@/data/mockData";

type Exercise = {
  name: string;
  group: string;
  video: string;
};

export default function AdminLessonsPage() {
  const [exercises, setExercises] = useState<Exercise[]>(() => [...contentCatalog.exercises]);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState<Exercise>({ name: "", group: "", video: "" });
  const [formError, setFormError] = useState("");

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setFormError("");
    if (showForm) {
      setFormState({ name: "", group: "", video: "" });
    }
  };

  const handleChange = (field: keyof Exercise, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValidUrl = (value: string) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmedName = formState.name.trim();
    const trimmedGroup = formState.group.trim();
    const trimmedVideo = formState.video.trim();

    if (!trimmedName || !trimmedGroup || !trimmedVideo) {
      setFormError("Vui lòng nhập đủ tên bài tập, nhóm cơ và link video.");
      return;
    }

    if (!isValidUrl(trimmedVideo)) {
      setFormError("Link video phải hợp lệ (http/https).");
      return;
    }

    setExercises((prev) => [
      { name: trimmedName, group: trimmedGroup, video: trimmedVideo },
      ...prev,
    ]);
    setFormState({ name: "", group: "", video: "" });
    setFormError("");
    setShowForm(false);
  };

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Thư viện bài tập</h2>
        <p className="text-sm text-zinc-500">
          Quản lý bài tập chuẩn hóa để coach thêm vào chương trình cá nhân của học viên.
        </p>
      </section>

      <SectionCard
        title="Danh sách bài tập"
        description="Mỗi bài tập bao gồm nhóm cơ và đường dẫn video minh họa."
        actions={
          <button
            type="button"
            onClick={toggleForm}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
          >
            {showForm ? "Đóng form" : "Thêm bài tập"}
          </button>
        }
      >
        {showForm ? (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-lg border border-dashed border-zinc-300 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Tên bài tập
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                Nhóm cơ
                <input
                  type="text"
                  value={formState.group}
                  onChange={(event) => handleChange("group", event.target.value)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Link video hướng dẫn
              <input
                type="url"
                value={formState.video}
                onChange={(event) => handleChange("video", event.target.value)}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                placeholder="https://..."
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
                Lưu bài tập
              </button>
            </div>
          </form>
        ) : null}

        <ul className="space-y-3 text-sm text-zinc-700">
          {exercises.map((exercise, index) => (
            <li key={`${exercise.name}-${index}`} className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4">
              <p className="font-semibold text-zinc-900">{exercise.name}</p>
              <span className="text-xs uppercase tracking-wide text-zinc-500">{exercise.group}</span>
              <Link
                href={exercise.video}
                className="text-sm font-medium text-zinc-900 underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Xem video hướng dẫn
              </Link>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
