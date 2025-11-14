"use client";

import { useMemo, useState } from "react";
import { Plus, Check, Clock, AlertCircle, Trash2, Edit2, Search, Paperclip } from "lucide-react";

import {
  coachNotesSeed,
  type CoachNoteRecord,
  type CoachNotePriority,
} from "@/data/mockData";

type StatusFilter = "all" | CoachNoteRecord["status"];
type PriorityFilter = "all" | CoachNotePriority;
type SortOption = "recent" | "due" | "priority";

interface NoteFormState {
  trainee: string;
  content: string;
  status: CoachNoteRecord["status"];
  priority: CoachNotePriority;
  tags: string;
  dueAt: string;
  relatedSession: string;
  attachmentLabel: string;
  attachmentUrl: string;
}

const statusConfig = {
  pending: {
    icon: AlertCircle,
    label: "Chưa xử lý",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  },
  "in-progress": {
    icon: Clock,
    label: "Đang thực hiện",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  completed: {
    icon: Check,
    label: "Hoàn thành",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
};

const priorityChip = {
  low: "border border-emerald-200 text-emerald-700 dark:border-emerald-500/60 dark:text-emerald-300",
  medium: "border border-amber-300 text-amber-700 dark:border-amber-500/60 dark:text-amber-300",
  high: "border border-red-300 text-red-700 dark:border-red-500/60 dark:text-red-300",
};

function getDueBadge(dueAt?: string) {
  if (!dueAt) {
    return null;
  }
  const due = new Date(dueAt).getTime();
  const now = Date.now();
  const diffHours = Math.round((due - now) / (1000 * 60 * 60));
  if (Number.isNaN(diffHours)) {
    return null;
  }
  if (diffHours < 0) {
    return { label: "Quá hạn", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" };
  }
  if (diffHours <= 24) {
    return { label: "Sắp đến hạn", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" };
  }
  return { label: `Còn ${Math.ceil(diffHours / 24)} ngày`, className: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" };
}

const initialForm: NoteFormState = {
  trainee: "",
  content: "",
  status: "pending",
  priority: "medium",
  tags: "",
  dueAt: "",
  relatedSession: "",
  attachmentLabel: "",
  attachmentUrl: "",
};

export default function NotesPage() {
  const [notes, setNotes] = useState<CoachNoteRecord[]>(coachNotesSeed);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<NoteFormState>(initialForm);

  const filteredNotes = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    const sorted = [...notes].sort((a, b) => {
      if (sortOption === "due") {
        const dueA = a.dueAt ? new Date(a.dueAt).getTime() : Number.POSITIVE_INFINITY;
        const dueB = b.dueAt ? new Date(b.dueAt).getTime() : Number.POSITIVE_INFINITY;
        return dueA - dueB;
      }
      if (sortOption === "priority") {
        const weight = { high: 0, medium: 1, low: 2 } as const;
        return weight[a.priority] - weight[b.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return sorted.filter((note) => {
      const matchesStatus = filterStatus === "all" || note.status === filterStatus;
      const matchesPriority = priorityFilter === "all" || note.priority === priorityFilter;
      const matchesSearch =
        search.length === 0 ||
        note.trainee.toLowerCase().includes(search) ||
        note.content.toLowerCase().includes(search) ||
        note.tags.some((tag) => tag.toLowerCase().includes(search));
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [notes, filterStatus, priorityFilter, sortOption, searchTerm]);

  const stats = useMemo(() => {
    const total = notes.length;
    const pending = notes.filter((note) => note.status === "pending").length;
    const inProgress = notes.filter((note) => note.status === "in-progress").length;
    const completed = notes.filter((note) => note.status === "completed").length;
    const highPriority = notes.filter((note) => note.priority === "high" && note.status !== "completed").length;
    const dueSoon = notes.filter((note) => getDueBadge(note.dueAt)?.label === "Sắp đến hạn").length;
    return { total, pending, inProgress, completed, highPriority, dueSoon };
  }, [notes]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormState(initialForm);
    setShowModal(true);
  };

  const openEditModal = (note: CoachNoteRecord) => {
    setEditingId(note.id);
    setFormState({
      trainee: note.trainee,
      content: note.content,
      status: note.status,
      priority: note.priority,
      tags: note.tags.join(", "),
      dueAt: note.dueAt ? note.dueAt.slice(0, 16) : "",
      relatedSession: note.relatedSession ?? "",
      attachmentLabel: note.attachmentLabel ?? "",
      attachmentUrl: note.attachmentUrl ?? "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormState(initialForm);
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tags = formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const payload: CoachNoteRecord = {
      id: editingId ?? (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`),
      trainee: formState.trainee,
      coach: "Minh Tran",
      status: formState.status,
      priority: formState.priority,
      content: formState.content,
      tags,
      createdAt: editingId ? notes.find((note) => note.id === editingId)?.createdAt ?? new Date().toISOString() : new Date().toISOString(),
      updatedAt: editingId ? new Date().toISOString() : undefined,
      dueAt: formState.dueAt ? new Date(formState.dueAt).toISOString() : undefined,
      relatedSession: formState.relatedSession || undefined,
      attachmentLabel: formState.attachmentLabel || undefined,
      attachmentUrl: formState.attachmentUrl || undefined,
    };

    setNotes((prev) => {
      if (editingId) {
        return prev.map((note) => (note.id === editingId ? payload : note));
      }
      return [payload, ...prev];
    });
    closeModal();
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updateNoteStatus = (id: string, newStatus: CoachNoteRecord["status"]) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Ghi chú & Nhắc việc</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Lưu lại nhận xét từng học viên, theo dõi tiến độ và đồng bộ các nhắc việc quan trọng.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 self-start rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <Plus className="h-4 w-4" /> Thêm ghi chú
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Tổng ghi chú</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Đang xử lý</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.pending + stats.inProgress}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Ưu tiên cao: {stats.highPriority}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Hoàn thành</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.completed}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Sắp đến hạn</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stats.dueSoon}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo học viên, nội dung hoặc tag..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          {(["recent", "due", "priority"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSortOption(option)}
              className={`rounded-full px-3 py-1 transition ${
                sortOption === option
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {option === "recent" ? "Mới nhất" : option === "due" ? "Gần đến hạn" : "Ưu tiên"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs font-semibold">
        <div className="inline-flex gap-2 rounded-full border border-zinc-200 p-1 dark:border-zinc-700">
          {(["all", "pending", "in-progress", "completed"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`rounded-full px-3 py-1 transition ${
                filterStatus === status
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {status === "all"
                ? "Tất cả"
                : status === "pending"
                  ? "Chưa xử lý"
                  : status === "in-progress"
                    ? "Đang thực hiện"
                    : "Hoàn thành"}
            </button>
          ))}
        </div>

        <div className="inline-flex gap-2 rounded-full border border-zinc-200 p-1 dark:border-zinc-700">
          {(["all", "low", "medium", "high"] as const).map((priority) => (
            <button
              key={priority}
              type="button"
              onClick={() => setPriorityFilter(priority)}
              className={`rounded-full px-3 py-1 transition ${
                priorityFilter === priority
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {priority === "all" ? "Mọi ưu tiên" : priority === "low" ? "Thấp" : priority === "medium" ? "Trung bình" : "Cao"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Không có ghi chú nào phù hợp với bộ lọc hiện tại.</p>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const StatusIcon = statusConfig[note.status].icon;
            const badge = getDueBadge(note.dueAt);
            return (
              <div
                key={note.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{note.trainee}</h3>
                      {note.relatedSession && (
                        <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-600 dark:text-zinc-300">
                          {note.relatedSession}
                        </span>
                      )}
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityChip[note.priority]}`}>
                        Ưu tiên: {note.priority === "high" ? "Cao" : note.priority === "medium" ? "Trung bình" : "Thấp"}
                      </span>
                      {badge && (
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}>{badge.label}</span>
                      )}
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{note.content}</p>

                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {note.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-600 dark:text-zinc-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <div className="inline-flex items-center gap-2">
                        <StatusIcon className="h-4 w-4" />
                        <span className={`rounded-full px-3 py-1 font-semibold ${statusConfig[note.status].color}`}>
                          {statusConfig[note.status].label}
                        </span>
                      </div>
                      <span>Ghi chú: {new Date(note.createdAt).toLocaleString("vi-VN")}</span>
                      {note.updatedAt && <span>Cập nhật: {new Date(note.updatedAt).toLocaleString("vi-VN")}</span>}
                      {note.attachmentUrl && (
                        <a
                          href={note.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-300"
                        >
                          <Paperclip className="h-3.5 w-3.5" /> {note.attachmentLabel ?? "Tài liệu đính kèm"}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {note.status !== "completed" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateNoteStatus(
                            note.id,
                            note.status === "pending" ? "in-progress" : "completed",
                          )
                        }
                        className="rounded-full border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        title={note.status === "pending" ? "Đánh dấu đang thực hiện" : "Hoàn thành"}
                      >
                        {note.status === "pending" ? <Clock className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => openEditModal(note)}
                      className="rounded-full border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteNote(note.id)}
                      className="rounded-full border border-zinc-200 p-2 text-red-600 transition hover:bg-red-50 dark:border-zinc-600 dark:text-red-300 dark:hover:bg-red-900/20"
                      title="Xóa ghi chú"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {editingId ? "Cập nhật ghi chú" : "Thêm ghi chú mới"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6 text-sm text-zinc-600 dark:text-zinc-300">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Học viên</span>
                  <input
                    required
                    value={formState.trainee}
                    onChange={(event) => setFormState((prev) => ({ ...prev, trainee: event.target.value }))}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                    placeholder="Nhập tên học viên"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Liên kết buổi tập</span>
                  <input
                    value={formState.relatedSession}
                    onChange={(event) => setFormState((prev) => ({ ...prev, relatedSession: event.target.value }))}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                    placeholder="Ví dụ: PT 1-1 • 10/06"
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Nội dung</span>
                <textarea
                  required
                  rows={4}
                  value={formState.content}
                  onChange={(event) => setFormState((prev) => ({ ...prev, content: event.target.value }))}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  placeholder="Ghi chú chi tiết cho học viên..."
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Trạng thái</span>
                  <select
                    value={formState.status}
                    onChange={(event) => setFormState((prev) => ({ ...prev, status: event.target.value as CoachNoteRecord["status"] }))}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  >
                    <option value="pending">Chưa xử lý</option>
                    <option value="in-progress">Đang thực hiện</option>
                    <option value="completed">Hoàn thành</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Ưu tiên</span>
                  <select
                    value={formState.priority}
                    onChange={(event) => setFormState((prev) => ({ ...prev, priority: event.target.value as CoachNotePriority }))}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Ngày hạn</span>
                  <input
                    type="datetime-local"
                    value={formState.dueAt}
                    onChange={(event) => setFormState((prev) => ({ ...prev, dueAt: event.target.value }))}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Tags</span>
                  <input
                    value={formState.tags}
                    onChange={(event) => setFormState((prev) => ({ ...prev, tags: event.target.value }))}
                    placeholder="Ví dụ: cardio, recovery"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Tên tài liệu</span>
                  <input
                    value={formState.attachmentLabel}
                    onChange={(event) => setFormState((prev) => ({ ...prev, attachmentLabel: event.target.value }))}
                    placeholder="Ví dụ: Video hướng dẫn"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Link tài liệu</span>
                  <input
                    value={formState.attachmentUrl}
                    onChange={(event) => setFormState((prev) => ({ ...prev, attachmentUrl: event.target.value }))}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </label>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {editingId ? "Cập nhật" : "Thêm ghi chú"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

