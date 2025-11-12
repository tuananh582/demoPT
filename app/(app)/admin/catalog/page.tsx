import { SectionCard } from "@/components/ui/SectionCard";
import { contentCatalog } from "@/data/mockData";

export default function AdminCatalogPage() {
  const { meals, programs } = contentCatalog;

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Danh mục dinh dưỡng & chương trình</h2>
        <p className="text-sm text-zinc-500">
          Cập nhật các meal plan mẫu và chương trình luyện tập để coach sử dụng thống nhất.
        </p>
      </section>

      <SectionCard
        title="Meal plan mẫu"
        description="Tham khảo nhanh các khẩu phần chuẩn được đội ngũ dinh dưỡng phê duyệt."
      >
        <ul className="space-y-3 text-sm text-zinc-700">
          {meals.map((meal) => (
            <li key={meal.name} className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4">
              <p className="font-semibold text-zinc-900">{meal.name}</p>
              <span className="text-xs uppercase tracking-wide text-zinc-500">{meal.calories}</span>
              <p className="text-xs text-zinc-500">Macros: {meal.macros}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard
        title="Chương trình luyện tập"
        description="Danh sách chương trình khung để coach tùy chỉnh theo mục tiêu học viên."
      >
        <ul className="space-y-3 text-sm text-zinc-700">
          {programs.map((program) => (
            <li key={program.name} className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4">
              <p className="font-semibold text-zinc-900">{program.name}</p>
              <p className="text-sm text-zinc-600">Mục tiêu: {program.goal}</p>
              <span className="text-xs uppercase tracking-wide text-zinc-500">Thời lượng: {program.duration}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
