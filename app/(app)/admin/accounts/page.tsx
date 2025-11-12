import { DataTable } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { accountRecords } from "@/data/mockData";

export default function AdminAccountsPage() {
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
            <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white">
              Tạo tài khoản
            </button>
            <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100">
              Xuất danh sách
            </button>
          </div>
        }
      >
        <DataTable
          columns={[
            { key: "name", header: "Tên" },
            { key: "email", header: "Email" },
            { key: "role", header: "Vai trò" },
            { key: "status", header: "Trạng thái" },
          ]}
          data={accountRecords}
        />
        <p className="text-xs text-zinc-500">
          Các thay đổi quan trọng cần ghi nhận log để đảm bảo truy vết an toàn.
        </p>
      </SectionCard>
    </>
  );
}
