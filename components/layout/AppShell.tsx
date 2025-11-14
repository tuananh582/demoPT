"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { NavItem } from "@/data/mockData";
import * as LucideIcons from "lucide-react";

interface AppShellProps {
  title: string;
  navItems: NavItem[];
  roleGuard: "admin" | "coach";
  children: ReactNode;
}

export function AppShell({ title, navItems, children, roleGuard }: AppShellProps) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateHash = () => {
      const nextHash = window.location.hash;
      setActiveHash(nextHash ?? "");
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [navItems]);

  // Handle role guard redirect
  useEffect(() => {
    if (!isLoading && (!user || user.role !== roleGuard)) {
      if (typeof window !== "undefined") {
        const redirectTarget = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
        router.replace(`/login${redirectTarget}`);
      }
    }
  }, [isLoading, user, roleGuard, pathname, router]);

  const currentItem = useMemo(() => {
    const firstHashItem = navItems.find((item) => item.href.startsWith("#"));
    const resolvedHash = activeHash || firstHashItem?.href || "";
    if (resolvedHash) {
      const matchedHash = navItems.find((item) => item.href === resolvedHash);
      if (matchedHash) {
        return matchedHash;
      }
    }
    if (!pathname) {
      return navItems[0];
    }
    const exactMatch = navItems.find((item) => !item.href.startsWith("#") && item.href === pathname);
    if (exactMatch) {
      return exactMatch;
    }
    const partialMatches = navItems
      .filter((item) => !item.href.startsWith("#") && pathname.startsWith(`${item.href}/`))
      .sort((a, b) => b.href.length - a.href.length);
    return partialMatches[0] ?? navItems[0];
  }, [activeHash, navItems, pathname]);

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    if (!Icon) return null;
    return <Icon className="h-5 w-5" />;
  };

  const renderNavLink = (item: NavItem, variant: "sidebar" | "bottom") => {
    const isHashLink = item.href.startsWith("#");
    const isActive = currentItem?.href === item.href;
    const baseClasses =
      variant === "sidebar"
        ? "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition"
        : "flex flex-1 flex-col items-center justify-center rounded-lg px-2 py-2 text-xs font-medium transition gap-1";
    const activeClasses = isActive
      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800";

    if (isHashLink) {
      return (
        <a
          key={item.href}
          href={item.href}
          onClick={() => setActiveHash(item.href)}
          className={`${baseClasses} ${activeClasses}`}
        >
          {variant === "sidebar" && getIcon(item.icon)}
          <span className={variant === "bottom" ? "line-clamp-1" : ""}>{item.label}</span>
        </a>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setActiveHash("")}
        className={`${baseClasses} ${activeClasses}`}
      >
        {variant === "sidebar" && getIcon(item.icon)}
        <span className={variant === "bottom" ? "line-clamp-1" : ""}>{item.label}</span>
      </Link>
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 text-center text-sm text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 lg:flex">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Workspace</p>
            <h1 className="mt-3 text-2xl font-semibold leading-tight text-zinc-900 dark:text-zinc-100">{title}</h1>
          </div>
          <nav className="flex flex-col gap-1 text-sm">
            {navItems.map((item) => renderNavLink(item, "sidebar"))}
          </nav>
          <div className="mt-auto space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Tài khoản</p>
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
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90 lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Workspace</p>
              <h1 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h1>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Đăng xuất
            </button>
          </div>
        </header>
        <main className="flex-1 space-y-8 px-4 pb-28 pt-6 md:px-10 lg:pb-10">{children}</main>
        <nav className="fixed bottom-4 left-1/2 z-30 flex w-[92%] -translate-x-1/2 gap-2 rounded-2xl border border-zinc-200 bg-white/95 p-2 text-sm shadow-lg backdrop-blur md:w-[420px] lg:hidden dark:border-zinc-700 dark:bg-zinc-900/95">
          {navItems.map((item) => renderNavLink(item, "bottom"))}
        </nav>
      </div>
    </div>
  );
}
