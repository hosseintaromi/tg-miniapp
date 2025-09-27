"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { TabBar } from "./TabBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const t = useTranslations();

  const title = (() => {
    if (!pathname) return "";
    if (pathname.includes("/profile")) return t("tabs.profile");
    if (pathname.includes("/consumption")) return t("tabs.consumption");
    if (pathname.includes("/payments")) return t("tabs.payments");
    if (pathname.includes("/buy-coins")) return t("tabs.buy");
    return "";
  })();

  const locale = params?.locale ?? "en";

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <div className="min-h-dvh flex flex-col">
      <header
        className="container-safe sticky top-0 z-10 p-4 pb-3 bg-[var(--surface-2)]"
        style={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
      >
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="text-[var(--brand)] font-semibold">
            tg
          </Link>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="flex gap-2">
            <Link
              href={pathname?.replace(`/${locale}`, "/en") || "/en"}
              className={`px-2 py-1 text-xs rounded ${locale === "en" ? "bg-[var(--brand)] text-black" : "text-[var(--muted)]"}`}
            >
              EN
            </Link>
            <Link
              href={pathname?.replace(`/${locale}`, "/fa") || "/fa"}
              className={`px-2 py-1 text-xs rounded ${locale === "fa" ? "bg-[var(--brand)] text-black" : "text-[var(--muted)]"}`}
            >
              فا
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container-safe pt-4 pb-24">{children}</main>
      <TabBar />
    </div>
  );
}
