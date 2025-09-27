"use client";
import { useAppState } from "@/services/store";
import { useTranslations } from "next-intl";
import { ListCard } from "@/components/ListCard";

export default function PaymentsPage() {
  const { state } = useAppState();
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-1">{t("payments.title")}</h2>
      {state.payments.map((p) => (
        <ListCard
          key={p.id}
          leading={"◎"}
          title={`${p.coins} ${t("coins.suffix")}`}
          subtitle={p.date}
          trailing={
            <div className="font-semibold text-green-400">{`+$${p.amountUsd.toFixed(2)}`}</div>
          }
        />
      ))}
    </div>
  );
}
