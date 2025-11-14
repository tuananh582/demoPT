
"use client";

import { useState } from "react";
import { Plus, Check, Clock, AlertCircle, Trash2, Edit2, Search } from "lucide-react";

interface Note {
  id: string;
  trainee: string;
  content: string;
  status: "pending" | "in-progress" | "completed";
  tags: string[];
  createdAt: string;
  relatedSession?: string;
}

const mockNotes: Note[] = [
  {
    id: "note-01",
    trainee: "Gia Han",
    content: "Cải thiện kỹ thuật deadlift, thêm warm-up lưỡng cạnh.",
    status: "completed",
    tags: ["form", "kỹ thuật"],
    createdAt: "01/06/2024 08:45",
    relatedSession: "PT 1-1 - 01/06",
  },
  {
    id: "note-02",
    trainee: "Gia Han",
    content: "Nhắc uống điện giải sau buổi cardio, cần ngủ đủ 7 tiếng.",
    status: "in-progress",
    tags: ["recovery", "nutrition"],
    createdAt: "01/06/2024 09:15",
  },
  {
    id: "note-03",
    trainee: "Quang Huy",
    content: "Thiếu 1 buổi cardio tuần này, cần theo dõi adherence.",
    status: "pending",
    tags: ["adherence", "cardio"],
    createdAt: "31/05/2024 18:00",
    relatedSession: "Check-in online - 25/05",
  },
  {
    id: "note-04",
    trainee: "Quang Huy",
    content: "Gửi mẫu cardio 20 phút dễ thao tác tại nhà.",
    status: "completed",
    tags: ["cardio", "home-workout"],
    createdAt: "30/05/2024 10:30",
  },
  {
    id: "note-05",
    trainee: "Linh Chi",
    content: "Chuẩn bị deck giới thiệu chương trình core/strength.",
    status: "pending",
    tags: ["onboarding", "program"],
    createdAt: "30/05/2024 14:00",
  },
];

const statusConfig = {
  pending: {
    icon: AlertCircle,
    label: "Chưa xem",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  "in-progress": {
    icon: Clock,
    label: "Đang thực hiện",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  completed: {
    icon: Check,
    label: "Đã hoàn thành",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | Note["status"]>("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.trainee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === "all" || note.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNoteStatus = (id: string, newStatus: Note["status"]) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, status: newStatus } : note))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Ghi chú & Nhắc việc
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Lưu lại nhận xét và ghi chú cho từng học viên
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <Plus className="h-4 w-4" />
          Thêm ghi chú
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Tìm kiếm ghi chú..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {(["all", "pending", "in-progress", "completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filterStatus === status
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {status === "all"
                ? "Tất cả"
                : status === "pending"
                ? "Chưa xem"
                : status === "in-progress"
                ? "Đang làm"
                : "Hoàn thành"}
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Không có ghi chú nào phù hợp với bộ lọc của bạn
            </p>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const StatusIcon = statusConfig[note.status].icon;
            return (
              <div
                key={note.id}
                className="rounded-lg border border-zinc-200 bg-white p-4 transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {note.trainee}
                      </h3>
                      {note.relatedSession && (
                        <span className="rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                          {note.relatedSession}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {note.content}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="flex items-center gap-1">
                        <StatusIcon className="h-4 w-4" />
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            statusConfig[note.status].color
                          }`}
                        >
                          {statusConfig[note.status].label}
                        </span>
                      </div>

                      {note.tags.length > 0 && (
                        <div className="flex gap-2">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {note.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {note.status !== "completed" && (
                      <button
                        onClick={() =>
                          updateNoteStatus(
                            note.id,
                            note.status === "pending" ? "in-progress" : "completed"
                          )
                        }
                        className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        title={
                          note.status === "pending" ? "Đang làm" : "Hoàn thành"
                        }
                      >
                        {note.status === "pending" ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => deleteNote(note.id)}
                      className="rounded-lg border border-zinc-200 p-2 text-red-600 transition hover:bg-red-50 dark:border-zinc-700 dark:text-red-400 dark:hover:bg-red-900/20"
                      title="Xóa"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white dark:bg-zinc-900">
            <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {editingId ? "Sửa ghi chú" : "Thêm ghi chú mới"}
              </h2>
            </div>

            <form className="space-y-4 p-6">
              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Học viên
                </label>
                <select className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                  <option>Chọn học viên</option>
                  <option>Gia Han</option>
                  <option>Quang Huy</option>
                  <option>Linh Chi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Nội dung ghi chú
                </label>
                <textarea
                  className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  rows={4}
                  placeholder="Nhập ghi chú của bạn..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Trạng thái
                </label>
                <select className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                  <option value="pending">Chưa xem</option>
                  <option value="in-progress">Đang làm</option>
                  <option value="completed">Hoàn thành</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
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

