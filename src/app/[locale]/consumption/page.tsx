"use client";
import { useAppState } from "@/services/store";
import { useTranslations } from "next-intl";
import { ListCard } from "@/components/ListCard";
import { CoinBadge } from "@/components/CoinBadge";

export default function ConsumptionPage() {
  const { state } = useAppState();
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-1">{t("consumption.title")}</h2>
      {state.consumptions.map((c) => {
        const title = c.titleKey ? t(c.titleKey) : c.title;
        const subtitle = c.subtitleKey ? t(c.subtitleKey) : c.subtitle;
        return (
          <ListCard
            key={c.id}
            leading={"◎"}
            title={title}
            subtitle={subtitle}
            trailing={<CoinBadge amount={c.coins} sign="-" />}
          />
        );
      })}
    </div>
  );
}
