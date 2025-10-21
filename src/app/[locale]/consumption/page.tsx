"use client";
import { useAppState } from "@/services/store";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ListCard } from "@/components/ListCard";
import { CoinBadge } from "@/components/CoinBadge";
import { NoSSR } from "@/components/NoSSR";

export default function ConsumptionPage() {
  const { state } = useAppState();
  const t = useTranslations();

  const totalSpent = state.consumptions.reduce((sum, c) => sum + Math.abs(c.coins), 0);

  return (
    <NoSSR>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-lg font-semibold">{t("consumption.title")}</h2>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 text-center">
            <div className="text-xs text-[var(--muted)] mb-1">{t("coins.suffix")}</div>
            <div className="text-xl font-bold">-{totalSpent.toLocaleString()}</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-xs text-[var(--muted)] mb-1">{t("consumption.featureUsage")}</div>
            <div className="text-xl font-bold">{state.consumptions.length}</div>
          </div>
        </div>

        {/* List */}
        {state.consumptions.map((c, index) => {
          const title = c.titleKey ? t(c.titleKey) : c.title;
          const subtitle = c.subtitleKey ? t(c.subtitleKey) : c.subtitle;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="card p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--surface)] flex items-center justify-center">
                ◎
              </div>
              <div className="flex-1">
                <div className="font-semibold">{title}</div>
                <div className="text-xs text-[var(--muted)]">{subtitle}</div>
              </div>
              <CoinBadge amount={c.coins} sign="-" />
            </motion.div>
          );
        })}
      </motion.div>
    </NoSSR>
  );
}
