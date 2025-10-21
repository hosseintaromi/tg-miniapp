"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { TabBar } from "./TabBar";
import { ErrorBoundary } from "./ErrorBoundary";
import { User as UserIcon } from "iconsax-react";
import { useTelegram } from "@/contexts/TelegramContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const t = useTranslations();
  const { user } = useTelegram();
  const locale = params?.locale ?? "en";

  const title = (() => {
    if (!pathname) return "";
    if (pathname.includes("/settings")) return t("tabs.settings");
    if (pathname.includes("/profile")) return t("tabs.profile");
    if (pathname.includes("/consumption")) return t("tabs.consumption");
    if (pathname.includes("/payments")) return t("tabs.payments");
    if (pathname.includes("/buy-coins")) return t("tabs.buy");
    if (pathname.endsWith(`/${locale}`) || pathname.includes(`/${locale}/home`))
      return t("tabs.home");
    return "";
  })();

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <div className="min-h-dvh flex flex-col">
      <header
        className="sticky top-0 z-10 bg-[var(--surface-2)]"
        style={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
      >
        <div className="container-safe p-4 pb-3">
          <div className="relative flex items-center justify-between">
            {/* Logo - right in FA, left in EN */}
            <div className={locale === "fa" ? "order-2" : "order-1"}>
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img
                  src="/abbas-agha-logo.jpeg"
                  alt="عباس آقا"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title - always center */}
            <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">{title}</h1>

            {/* Profile - left in FA, right in EN */}
            <Link
              href={`/${locale}/profile`}
              aria-label="Profile"
              className={`text-[var(--muted)] hover:text-[var(--brand)] transition-colors ${locale === "fa" ? "order-1" : "order-2"}`}
            >
              {user?.photo_url ? (
                <img
                  src={user.photo_url}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--brand)]/15 text-[var(--brand)] flex items-center justify-center">
                  <UserIcon size={18} />
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 pt-4 pb-24">
        <div className="container-safe">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
      <TabBar />
    </div>
  );
}
