import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { coachNavItems } from "@/data/mockData";

export default function CoachLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell title="Không gian Coach" navItems={coachNavItems} roleGuard="coach">
      {children}
    </AppShell>
  );
}
