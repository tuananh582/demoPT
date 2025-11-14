
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
    {
      icon: Mail,
      label: "Email",
      value: trainer.email,
      color: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
    },
    {
      icon: Award,
      label: "Chuyên môn",
      value: trainer.specialization,
      color: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
    },
    {
      icon: Ruler,
      label: "Chiều cao",
      value: trainer.height || "—",
      color: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
    },
    {
      icon: Weight,
      label: "Cân nặng",
      value: trainer.weight || "—",
      color: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
    },
    {
      icon: Briefcase,
      label: "Kinh nghiệm",
      value: trainer.experience || "—",
      color: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    },
    {
      icon: Phone,
      label: "Điện thoại",
      value: trainer.phone || "—",
      color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 p-6 text-white dark:text-zinc-900">
        <h2 className="text-2xl font-bold">{trainer.name}</h2>
        <p className="mt-1 text-sm opacity-80">Huấn luyện viên PT</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {infos.map((info) => {
          const Icon = info.icon;
          return (
            <div
              key={info.label}
              className={`rounded-lg border border-zinc-200 p-4 dark:border-zinc-700 ${info.color}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 flex-shrink-0" />
                <p className="text-xs font-semibold opacity-75">{info.label}</p>
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-semibold">{info.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

