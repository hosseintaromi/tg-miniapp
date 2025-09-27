"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export function TabBar() {
  const pathname = usePathname() || "";
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "en";
  const t = useTranslations();

  const tabs = [
    { key: "profile", href: `/${locale}/profile`, label: t("tabs.profile") },
    { key: "consumption", href: `/${locale}/consumption`, label: t("tabs.consumption") },
    { key: "payments", href: `/${locale}/payments`, label: t("tabs.payments") },
    { key: "buy", href: `/${locale}/buy-coins`, label: t("tabs.buy") },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-[var(--surface-2)] py-2"
      style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
    >
      <div className="container-safe grid grid-cols-4 gap-2 text-sm">
        {tabs.map((tab) => {
          const active =
            pathname.includes(`/${tab.key}`) ||
            (tab.key === "profile" && pathname.endsWith(`/${locale}`));
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`text-center px-2 py-2 rounded-md ${active ? "text-[var(--brand)]" : "text-[var(--muted)]"}`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
