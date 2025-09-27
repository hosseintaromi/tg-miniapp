"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { User, Activity, Card, Add } from "iconsax-react";

export function TabBar() {
  const pathname = usePathname() || "";
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "en";
  const t = useTranslations();

  const tabs = [
    {
      key: "profile",
      href: `/${locale}/profile`,
      label: t("tabs.profile"),
      icon: User,
    },
    {
      key: "consumption",
      href: `/${locale}/consumption`,
      label: t("tabs.consumption"),
      icon: Activity,
    },
    {
      key: "payments",
      href: `/${locale}/payments`,
      label: t("tabs.payments"),
      icon: Card,
    },
    {
      key: "buy",
      href: `/${locale}/buy-coins`,
      label: t("tabs.buy"),
      icon: Add,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-[var(--surface-2)] py-2"
      style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
    >
      <div className="container-safe grid grid-cols-4 gap-2 text-xs">
        {tabs.map((tab) => {
          const active =
            pathname.includes(`/${tab.key}`) ||
            (tab.key === "profile" && pathname.endsWith(`/${locale}`));
          const IconComponent = tab.icon;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`flex flex-col items-center px-2 py-2 rounded-md gap-1 ${active ? "text-[var(--brand)]" : "text-[var(--muted)]"}`}
            >
              <IconComponent size={22} variant={active ? "Bold" : "Outline"} color="currentColor" />
              <span className="text-xs">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
