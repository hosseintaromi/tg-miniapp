"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Activity, Card, Add, Home, Setting2 } from "iconsax-react";

export function TabBar() {
  const pathname = usePathname() || "";
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "en";
  const t = useTranslations();

  const tabs = [
    {
      key: "home",
      href: `/${locale}/home`,
      label: t("tabs.home"),
      icon: Home,
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
    {
      key: "settings",
      href: `/${locale}/settings`,
      label: t("tabs.settings"),
      icon: Setting2,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-[var(--surface-2)] py-3"
      style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
    >
      <div className="mx-auto" style={{ maxWidth: "480px" }}>
        <div className="container-safe flex justify-between items-center text-xs px-2">
          {tabs.map((tab) => {
            const isHome = pathname === `/${locale}` || pathname.startsWith(`/${locale}/home`);
            const active =
              tab.key === "home" ? isHome : pathname.startsWith(`/${locale}/${tab.key}`);
            const IconComponent = tab.icon;
            return (
              <Link
                key={tab.key}
                href={tab.href}
                className="relative flex flex-col items-center px-2 py-2 rounded-md gap-1 min-w-[56px] flex-1 max-w-[80px]"
              >
                <motion.div
                  className={`flex flex-col items-center gap-1 ${active ? "text-[var(--brand)]" : "text-[var(--muted)]"}`}
                  animate={{
                    scale: active ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <IconComponent
                    size={20}
                    variant={active ? "Bold" : "Outline"}
                    color="currentColor"
                  />
                  <span className="text-xs truncate max-w-[60px]">{tab.label}</span>
                </motion.div>

                {active && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--brand)] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
