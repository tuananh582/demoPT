"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@gymflow.vn");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [redirectTarget, setRedirectTarget] = useState("/admin");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get("redirect");
    if (redirectParam) {
      setRedirectTarget(redirectParam);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = login({ email, password });
    if (!result.success) {
      setError(result.message ?? "Không thể đăng nhập");
      return;
    }

    setError(null);
    // Determine redirect destination
    const destination = redirectTarget.includes("coach")
      ? "/coach"
      : email.toLowerCase().includes("coach")
        ? "/coach"
        : "/admin";
    
    // Use setTimeout to ensure state update happens before navigation
    setTimeout(() => {
      router.push(destination);
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="ví dụ: admin@gymflow.vn"
          autoComplete="username"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="Nhập mật khẩu"
          autoComplete="current-password"
        />
      </div>
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2"
      >
        Đăng nhập
      </button>
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/60 p-4 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
        <p className="font-semibold text-zinc-600 dark:text-zinc-200">Tài khoản demo</p>
        <p>Admin: admin@gymflow.vn / admin123</p>
        <p>Coach: coach@gymflow.vn / coach123</p>
      </div>
    </form>
  );
}
