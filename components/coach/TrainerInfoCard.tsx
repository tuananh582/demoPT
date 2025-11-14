
"use client";

import {
  Mail,
  Award,
  Ruler,
  Weight,
  Briefcase,
  Phone,
} from "lucide-react";

interface TrainerInfo {
  name: string;
  email: string;
  specialization: string;
  height?: string;
  weight?: string;
  experience?: string;
  phone?: string;
}

interface TrainerInfoCardProps {
  trainer: TrainerInfo;
}

export function TrainerInfoCard({ trainer }: TrainerInfoCardProps) {
  const infos = [
    { icon: Mail, label: "Email", value: trainer.email },
    { icon: Award, label: "Chuyên môn", value: trainer.specialization },
    { icon: Ruler, label: "Chiều cao", value: trainer.height || "—" },
    { icon: Weight, label: "Cân nặng", value: trainer.weight || "—" },
    { icon: Briefcase, label: "Kinh nghiệm", value: trainer.experience || "—" },
    { icon: Phone, label: "Điện thoại", value: trainer.phone || "—" },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{trainer.name}</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Huấn luyện viên cá nhân</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {infos.map((info) => {
          const Icon = info.icon;
          return (
            <div
              key={info.label}
              className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">{info.label}</p>
              </div>
              <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{info.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

