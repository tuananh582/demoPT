import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { traineeRecords } from "@/data/mockData";

export default function AdminTraineesPage() {
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
          <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white">
            Thêm học viên
          </button>
        }
      >
        <DataTable
          columns={[
            { key: "name", header: "Họ tên" },
            { key: "email", header: "Email" },
            { key: "phone", header: "Số điện thoại" },
            { key: "status", header: "Trạng thái" },
            { key: "package", header: "Gói tập" },
          ]}
          data={traineeRecords}
        />
        <p className="text-xs text-zinc-500">
          Các chỉ số đo lường chi tiết được ghi nhận ở mục tiến trình riêng của từng học viên.
        </p>
      </SectionCard>
    </>
  );
}
