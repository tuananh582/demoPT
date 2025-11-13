"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { NavItem } from "@/data/mockData";

interface AppShellProps {
  title: string;
  navItems: NavItem[];
  roleGuard: "admin" | "coach";
  children: ReactNode;
}

export function AppShell({ title, navItems, children, roleGuard }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  
  // Safely call useAuth only after mounting on client side
  let user, isLoading, logout;
  try {
    const auth = useAuth();
    user = auth.user;
    isLoading = auth.isLoading;
    logout = auth.logout;
  } catch {
    // During build/SSR, auth is not available - that's OK
    user = null;
    isLoading = false;
    logout = () => {};
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateHash = () => {
      const nextHash = window.location.hash || navItems[0]?.href || "";
      setActiveHash(nextHash);
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [navItems]);

  const currentItem = useMemo(() => {
    if (activeHash) {
      return navItems.find((item) => item.href === activeHash) ?? navItems[0];
    }
    return navItems.find((item) => pathname?.includes(item.href.replace("#", ""))) ?? navItems[0];
  }, [activeHash, navItems, pathname]);

  // Only check auth on client side, not during SSR/build
  const shouldCheckAuth = typeof window !== "undefined";
  
  if (shouldCheckAuth && !isLoading && (!user || user.role !== roleGuard)) {
    const redirectTarget = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
    router.replace(`/login${redirectTarget}`);
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 text-center text-sm text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
        Đang chuyển hướng...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-zinc-100 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 lg:flex">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-500">GymFlow</p>
            <h1 className="mt-3 text-2xl font-semibold leading-tight">{title}</h1>
          </div>
          <nav className="flex flex-col gap-1 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveHash(item.href)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left font-medium transition-colors ${
                  currentItem?.href === item.href
                    ? "bg-indigo-500 text-white shadow"
                    : "text-zinc-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-zinc-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Tài khoản</p>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{user?.name ?? ""}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{user?.email ?? ""}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
              className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-500">GymFlow</p>
              <h1 className="mt-1 text-lg font-semibold">{title}</h1>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
              className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Đăng xuất
            </button>
          </div>
        </header>
        <main className="flex-1 space-y-8 px-4 pb-28 pt-6 md:px-10 lg:pb-10">
          {children}
        </main>
        <nav className="fixed bottom-4 left-1/2 z-30 flex w-[92%] -translate-x-1/2 gap-2 rounded-2xl border border-zinc-200 bg-white/90 p-2 text-sm shadow-lg backdrop-blur md:w-[420px] lg:hidden dark:border-zinc-800 dark:bg-zinc-900/90">
          {navItems.map((item) => {
            const isActive = currentItem?.href === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveHash(item.href)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-500 text-white shadow"
                    : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
