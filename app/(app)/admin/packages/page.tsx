import { SectionCard } from "@/components/ui/SectionCard";
import { packages } from "@/data/mockData";

export default function AdminPackagesPage() {
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
          <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white">
            Thêm gói mới
          </button>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((item) => (
            <article key={item.name} className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">{item.duration}</p>
                <h3 className="mt-1 text-lg font-semibold text-zinc-900">{item.name}</h3>
              </div>
              <p className="text-sm text-zinc-600">{item.description}</p>
              <p className="text-base font-semibold text-zinc-900">{item.price}</p>
              <button className="mt-auto w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100">
                Chỉnh sửa
              </button>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
