"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { NavItem } from "@/data/mockData";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.innerWidth >= 1024;
  });
  const hasHashNavigation = useMemo(() => navItems.some((item) => item.href.startsWith("#")), [navItems]);

  useEffect(() => {
    if (!hasHashNavigation || typeof window === "undefined") return;
    const updateHash = () => {
      const nextHash = window.location.hash || navItems[0]?.href || "";
      setActiveHash(nextHash);
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [hasHashNavigation, navItems]);

  const currentItem = useMemo(() => {
    if (hasHashNavigation) {
      if (activeHash) {
        return navItems.find((item) => item.href === activeHash) ?? navItems[0];
      }
      const normalizedPath = pathname ? `#${pathname.split("#")[1] ?? ""}` : "";
      return navItems.find((item) => item.href === normalizedPath) ?? navItems[0];
    }
    return (
      navItems.find((item) => {
        if (!pathname) return false;
        return pathname === item.href || pathname.startsWith(`${item.href}/`);
      }) ?? navItems[0]
    );
  }, [activeHash, hasHashNavigation, navItems, pathname]);

  const handleNavigation = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      event.preventDefault();
      if (typeof window !== "undefined") {
        window.location.hash = href;
      }
      setActiveHash(href);
      return;
    }
    event.preventDefault();
    router.push(href);
  };

  const sidebarStyle: CSSProperties | undefined = isSidebarOpen
    ? undefined
    : {
        width: 0,
        padding: 0,
        borderRightWidth: 0,
        pointerEvents: "none",
      };

  const sidebarClassName = `${
    isSidebarOpen ? "fixed inset-y-0 left-0 z-40 flex w-64 shadow-lg lg:static" : "hidden lg:static"
  } flex-col overflow-hidden border-r border-zinc-200 bg-white p-6 transition-all duration-300 ease-in-out lg:flex lg:w-64 lg:p-6 lg:shadow-none`;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (!isLoading && (!user || user.role !== roleGuard)) {
    if (typeof window !== "undefined") {
      const redirectTarget = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${redirectTarget}`);
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 text-center text-sm text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
        Đang chuyển hướng...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-zinc-900">
      <aside id="app-sidebar" aria-hidden={!isSidebarOpen} aria-label="Điều hướng" style={sidebarStyle} className={sidebarClassName}>
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">GymFlow</p>
            <h1 className="mt-3 text-2xl font-semibold leading-tight text-zinc-900">{title}</h1>
          </div>
          <nav className="flex flex-col gap-1 text-sm">
            {navItems.map((item) => {
              const isActive = currentItem?.href === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigation(item.href)}
                  className={`rounded-lg px-3 py-2 font-medium transition-colors ${
                    isActive ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="mt-auto space-y-3 rounded-lg border border-zinc-200 p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Tài khoản</p>
            <div>
              <p className="text-sm font-semibold text-zinc-900">{user?.name ?? ""}</p>
              <p className="text-xs text-zinc-500">{user?.email ?? ""}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>
      {isSidebarOpen ? (
        <div
          role="presentation"
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ease-in-out lg:hidden"
        />
      ) : null}
      <div className="flex flex-1 flex-col">
        <div className="hidden items-center justify-between border-b border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur lg:flex">
          <button
            type="button"
            aria-controls="app-sidebar"
            aria-pressed={isSidebarOpen}
            aria-expanded={isSidebarOpen}
            onClick={toggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring focus-visible:ring-zinc-400"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path d="M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z" />
              <path d="M9 7h6" />
              <path d="M9 11h6" />
              <path d="M9 15h4" />
            </svg>
            <span className="sr-only">{isSidebarOpen ? "Ẩn menu" : "Hiện menu"}</span>
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">GymFlow</p>
            <h1 className="mt-1 text-lg font-semibold text-zinc-900">{title}</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              router.replace("/login");
            }}
            className="rounded-md border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
          >
            Đăng xuất
          </button>
        </div>
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-controls="app-sidebar"
                aria-pressed={isSidebarOpen}
                aria-expanded={isSidebarOpen}
                onClick={toggleSidebar}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring focus-visible:ring-zinc-400"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z" />
                  <path d="M9 7h6" />
                  <path d="M9 11h6" />
                  <path d="M9 15h4" />
                </svg>
                <span className="sr-only">{isSidebarOpen ? "Ẩn menu" : "Hiện menu"}</span>
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">GymFlow</p>
                <h1 className="mt-1 text-lg font-semibold text-zinc-900">{title}</h1>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
              className="rounded-md border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-900 hover:text-white"
            >
              Đăng xuất
            </button>
          </div>
          <nav className="flex overflow-x-auto border-t border-zinc-200 px-2 py-2 text-sm">
            {navItems.map((item) => {
              const isActive = currentItem?.href === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigation(item.href)}
                  className={`mr-2 whitespace-nowrap rounded-md px-3 py-2 font-medium transition-colors ${
                    isActive ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </header>
        <main className="flex-1 px-4 pb-16 pt-6 md:px-10 lg:pb-10">{children}</main>
      </div>
    </div>
  );
}
