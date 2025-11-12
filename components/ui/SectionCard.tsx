"use client";

import type { ReactNode } from "react";

interface SectionCardProps {
  id?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function SectionCard({ id, title, description, actions, children }: SectionCardProps) {
  return (
    <section
      id={id}
      className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900"
    >
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="mt-2 md:mt-0">{actions}</div> : null}
      </header>
      <div className="mt-6 space-y-4 text-sm text-zinc-700 dark:text-zinc-200 md:text-base">{children}</div>
    </section>
  );
}
