"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { adminNavItems } from "@/data/mockData";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell title="Trung tâm quản trị" navItems={adminNavItems} roleGuard="admin">
      <div className="space-y-8">{children}</div>
    </AppShell>
  );
}
