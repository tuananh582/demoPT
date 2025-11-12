"use client";

import { useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import { packages as packageCatalog } from "@/data/mockData";

interface HighlightPackage {
  name: string;
  price: string;
  description: string;
}

const defaultHighlights: HighlightPackage[] = packageCatalog.slice(0, 3).map((pkg) => ({
  name: pkg.name,
  price: pkg.price,
  description: pkg.description,
}));

export default function AdminMarketingPage() {
  const [heroTitle, setHeroTitle] = useState("Huấn luyện cá nhân đẳng cấp tại phòng PT");
  const [heroDescription, setHeroDescription] = useState(
    "Kết nối với đội ngũ coach chuyên môn, lộ trình ăn tập cá nhân hóa và trải nghiệm phòng tập chuẩn boutique.",
  );
  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1517832207067-4db24a2ae47c");
  const [highlightPackages, setHighlightPackages] = useState<HighlightPackage[]>(() =>
    defaultHighlights.length > 0
      ? defaultHighlights
      : [
          {
            name: "PT chuyên sâu",
            price: "Liên hệ",
            description: "Huấn luyện 1-1 với giáo án và meal plan cá nhân hóa.",
          },
        ],
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleHighlightChange = (index: number, field: keyof HighlightPackage, value: string) => {
    setHighlightPackages((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
    );
  };

  const addHighlight = () => {
    setHighlightPackages((prev) => [
      ...prev,
      {
        name: "Gói mới",
        price: "0₫",
        description: "Mô tả ngắn về gói.",
      },
    ]);
  };

  const removeHighlight = (index: number) => {
    setHighlightPackages((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!heroTitle.trim() || !heroDescription.trim() || !heroImage.trim()) {
      setFeedbackMessage("Vui lòng điền đầy đủ tiêu đề, mô tả và link ảnh hero.");
      return;
    }
    setFeedbackMessage("Đã lưu cấu hình marketing cho landing page.");
  };

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900">Marketing phòng PT</h2>
        <p className="text-sm text-zinc-500">
          Cập nhật nội dung hiển thị trên landing page phòng PT: tiêu đề, mô tả, hình ảnh và các gói nổi bật.
        </p>
      </section>

      <SectionCard
        title="Nội dung marketing"
        description="Chỉnh sửa hero section và danh sách gói nổi bật. Nội dung sau khi lưu sẽ dùng cho trang giới thiệu."
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Tiêu đề hero
              <input
                type="text"
                value={heroTitle}
                onChange={(event) => setHeroTitle(event.target.value)}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Link ảnh hero
              <input
                type="url"
                value={heroImage}
                onChange={(event) => setHeroImage(event.target.value)}
                className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                placeholder="https://..."
                required
              />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm text-zinc-700">
            Mô tả hero
            <textarea
              value={heroDescription}
              onChange={(event) => setHeroDescription(event.target.value)}
              className="min-h-[96px] rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
              required
            />
          </label>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">Gói nổi bật</h3>
              <button
                type="button"
                onClick={addHighlight}
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Thêm gói
              </button>
            </div>
            <div className="space-y-4">
              {highlightPackages.map((item, index) => (
                <div key={`${item.name}-${index}`} className="rounded-lg border border-zinc-200 p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-1 text-sm text-zinc-700">
                      Tên gói
                      <input
                        type="text"
                        value={item.name}
                        onChange={(event) => handleHighlightChange(index, "name", event.target.value)}
                        className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-zinc-700">
                      Giá hiển thị
                      <input
                        type="text"
                        value={item.price}
                        onChange={(event) => handleHighlightChange(index, "price", event.target.value)}
                        className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                        required
                      />
                    </label>
                  </div>
                  <label className="mt-3 flex flex-col gap-1 text-sm text-zinc-700">
                    Mô tả ngắn
                    <textarea
                      value={item.description}
                      onChange={(event) => handleHighlightChange(index, "description", event.target.value)}
                      className="min-h-[72px] rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                      required
                    />
                  </label>
                  {highlightPackages.length > 1 ? (
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                      >
                        Xóa gói này
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {feedbackMessage ? <p className="text-sm text-emerald-600">{feedbackMessage}</p> : null}
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Lưu cấu hình
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard
        title="Xem trước landing page"
        description="Hiển thị nhanh hero section và các gói nổi bật như người dùng sẽ thấy."
      >
        <div className="flex flex-col gap-6">
          <div
            className="rounded-lg bg-zinc-900 p-6 text-white"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(17,17,17,0.7), rgba(17,17,17,0.7)), url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3 className="text-2xl font-semibold">{heroTitle}</h3>
            <p className="mt-2 max-w-2xl text-sm text-zinc-200">{heroDescription}</p>
            <div className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-wide">
              Trải nghiệm PT cao cấp
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {highlightPackages.map((item, index) => (
              <article key={`${item.name}-preview-${index}`} className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4">
                <h4 className="text-lg font-semibold text-zinc-900">{item.name}</h4>
                <p className="text-sm text-zinc-600">{item.description}</p>
                <p className="text-base font-semibold text-zinc-900">{item.price}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionCard>
    </>
  );
}
