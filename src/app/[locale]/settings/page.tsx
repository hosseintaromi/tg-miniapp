"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { NoSSR } from "@/components/NoSSR";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter, usePathname } from "next/navigation";

export default function SettingsPage() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const themes = [
    { id: "orange" as const, name: t("settings.themes.orange"), color: "#ff8c42" },
    { id: "green" as const, name: t("settings.themes.green"), color: "#7cff3a" },
    { id: "blue" as const, name: t("settings.themes.blue"), color: "#42a5ff" },
  ];

  const languages = [
    { id: "fa", name: t("settings.languages.fa"), flag: "🇮🇷" },
    { id: "en", name: t("settings.languages.en"), flag: "🇺🇸" },
  ];

  const currentLocale = pathname?.split("/")[1] || "fa";

  const handleLanguageChange = (langId: string) => {
    const newPath = pathname?.replace(`/${currentLocale}`, `/${langId}`) || `/${langId}`;
    router.push(newPath);
  };

  return (
    <NoSSR>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6"
      >
        {/* Theme Selection */}
        <section>
          <h2 className="text-lg font-semibold mb-4">{t("settings.theme")}</h2>
          <div className="space-y-3">
            {themes.map((themeOption) => (
              <motion.button
                key={themeOption.id}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                onClick={() => setTheme(themeOption.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  theme === themeOption.id
                    ? "border-[var(--brand)] bg-[var(--brand)]/10"
                    : "border-[var(--surface-2)] bg-[var(--surface-2)]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: themeOption.color }}
                  />
                  <div className="flex-1 text-right">
                    <div className="font-semibold">{themeOption.name}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      theme === themeOption.id
                        ? "border-[var(--brand)] bg-[var(--brand)]"
                        : "border-[var(--muted)]"
                    }`}
                  >
                    {theme === themeOption.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="w-full h-full rounded-full bg-[var(--brand)] flex items-center justify-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-black" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Language Selection */}
        <section>
          <h2 className="text-lg font-semibold mb-4">{t("settings.language")}</h2>
          <div className="space-y-3">
            {languages.map((lang) => (
              <motion.button
                key={lang.id}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                onClick={() => handleLanguageChange(lang.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  currentLocale === lang.id
                    ? "border-[var(--brand)] bg-[var(--brand)]/10"
                    : "border-[var(--surface-2)] bg-[var(--surface-2)]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{lang.flag}</div>
                  <div className="flex-1 text-right">
                    <div className="font-semibold">{lang.name}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      currentLocale === lang.id
                        ? "border-[var(--brand)] bg-[var(--brand)]"
                        : "border-[var(--muted)]"
                    }`}
                  >
                    {currentLocale === lang.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="w-full h-full rounded-full bg-[var(--brand)] flex items-center justify-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-black" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </motion.div>
    </NoSSR>
  );
}
