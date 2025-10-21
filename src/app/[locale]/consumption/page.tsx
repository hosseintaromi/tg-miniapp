"use client";
import { useAppState } from "@/services/store";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { NoSSR } from "@/components/NoSSR";
import { PageHeader } from "@/components/PageHeader";
import { StatsCard } from "@/components/StatsCard";
import { ConsumptionCard } from "@/components/ConsumptionCard";

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
        <PageHeader title={t("consumption.title")} />

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            label={t("coins.suffix")}
            value={`-${totalSpent.toLocaleString()}`}
            variant="danger"
          />
          <StatsCard
            label={t("consumption.featureUsage")}
            value={state.consumptions.length}
            delay={0.1}
          />
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {state.consumptions.map((c, index) => {
            const title = c.titleKey ? t(c.titleKey) : c.title;
            const subtitle = c.subtitleKey ? t(c.subtitleKey) : c.subtitle;
            return (
              <ConsumptionCard
                key={c.id}
                consumption={c}
                title={title}
                subtitle={subtitle}
                delay={index * 0.05}
              />
            );
          })}
        </div>
      </motion.div>
    </NoSSR>
  );
}
