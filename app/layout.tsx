import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitCampus – Nền tảng wellness dành cho sinh viên",
  description:
    "FitCampus - Nền tảng fitness toàn diện cho sinh viên. Lộ trình tập luyện cá nhân hóa, lịch lớp, theo dõi tiến độ, thử thách cộng đồng và hỗ trợ mentor.",
  keywords: ["fitness", "gym", "wellness", "student", "challenge", "health"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="apple-mobile-web-app-capable" content="true" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className="antialiased bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
