import { SectionCard } from "@/components/ui/SectionCard";
import { upcomingSchedules } from "@/data/mockData";

export default function AdminSchedulePage() {
  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Lịch học</h2>
        <p className="text-sm text-zinc-500">
          Tổng hợp các buổi học sắp diễn ra để điều phối coach và thông báo cho học viên.
        </p>
      </section>

      <SectionCard
        title="Lịch theo tuần"
        description="Danh sách sắp xếp theo thời gian, bao gồm loại buổi và liên kết tham gia."
      >
        <ul className="space-y-3 text-sm text-zinc-700">
          {upcomingSchedules.map((item) => (
            <li key={`${item.title}-${item.time}`} className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-zinc-900">{item.title}</p>
                <span className="text-xs uppercase tracking-wide text-zinc-500">
                  {item.type === "group" ? "Nhóm" : item.type === "one_on_one" ? "1-1" : "Online"}
                </span>
              </div>
              <p className="text-sm text-zinc-600">Thời gian: {item.time}</p>
              <p className="text-sm text-zinc-600">Coach phụ trách: {item.coach}</p>
              <p className="text-xs text-zinc-500">Liên kết/địa điểm: {item.link}</p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100">
                  Xác nhận
                </button>
                <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100">
                  Gửi nhắc
                </button>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
