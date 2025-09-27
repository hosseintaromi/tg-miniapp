"use client";
import { useTranslations } from "next-intl";

export default function LocaleHome() {
  const t = useTranslations();
  return <div className="p-6">{t("app.title")}</div>;
}
