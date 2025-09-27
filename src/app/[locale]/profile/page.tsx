"use client";
import { useTranslations } from "next-intl";
import { useAppState } from "@/services/store";

export default function ProfilePage() {
  const t = useTranslations();
  const { state } = useAppState();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 mt-4">
        <div className="w-28 h-28 rounded-full bg-[var(--surface-2)]" />
        <div className="text-xl font-semibold">Ethan Carter</div>
        <div className="text-[var(--muted)]">@ethan_carter</div>
      </div>
      <section className="card p-4">
        <div className="text-sm text-[var(--muted)] mb-2">{t("profile.balance")}</div>
        <div className="text-lg font-semibold">
          {state.balance.toLocaleString()} {t("coins.suffix")}
        </div>
      </section>
    </div>
  );
}
