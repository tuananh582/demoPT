import Link from "next/link";
import { SectionCard } from "@/components/ui/SectionCard";
import { contentCatalog } from "@/data/mockData";

export default function AdminLessonsPage() {
  const { exercises } = contentCatalog;

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
          <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white">
            Thêm bài tập
          </button>
        }
      >
        <ul className="space-y-3 text-sm text-zinc-700">
          {exercises.map((exercise) => (
            <li key={exercise.name} className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4">
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
