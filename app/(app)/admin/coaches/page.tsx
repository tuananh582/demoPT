import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { coachRecords } from "@/data/mockData";

export default function AdminCoachesPage() {
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
          <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white">
            Thêm coach
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
        <p className="text-xs text-zinc-500">
          Lịch chi tiết theo buổi được xem ở mục Lịch học để tránh trùng lịch hoặc quá tải.
        </p>
      </SectionCard>
    </>
  );
}
