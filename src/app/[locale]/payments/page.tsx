"use client";
import { useAppState } from "@/services/store";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { NoSSR } from "@/components/NoSSR";
import { PageHeader } from "@/components/PageHeader";
import { StatsCard } from "@/components/StatsCard";
import { PaymentCard } from "@/components/PaymentCard";
import { useParams } from "next/navigation";
import { formatNumber, formatCurrency, toPersianDigits } from "@/lib/utils";

export default function PaymentsPage() {
  const { state } = useAppState();
  const t = useTranslations();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "fa";

  const totalCoins = state.payments.reduce((sum, p) => sum + p.coins, 0);
  const totalUsd = state.payments.reduce((sum, p) => sum + p.amountUsd, 0);

  return (
    <NoSSR>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4"
      >
        <PageHeader title={t("payments.title")} />

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard label="USD" value={`$${formatCurrency(totalUsd, locale)}`} variant="success" />
          <StatsCard
            label={t("coins.suffix")}
            value={`+${formatNumber(totalCoins, locale)}`}
            delay={0.1}
          />
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {state.payments.map((payment, index) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
              locale={locale}
              formatNumber={formatNumber}
              formatCurrency={formatCurrency}
              toPersianDigits={toPersianDigits}
              coinsLabel={t("coins.suffix")}
              delay={index * 0.05}
            />
          ))}
        </div>
      </motion.div>
    </NoSSR>
  );
}
