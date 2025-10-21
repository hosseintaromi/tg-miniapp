"use client";
import { useAppState } from "@/services/store";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ListCard } from "@/components/ListCard";
import { NoSSR } from "@/components/NoSSR";
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
        <h2 className="text-lg font-semibold">{t("payments.title")}</h2>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 text-center">
            <div className="text-xs text-[var(--muted)] mb-1">USD</div>
            <div className="text-xl font-bold">${formatCurrency(totalUsd, locale)}</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-xs text-[var(--muted)] mb-1">{t("coins.suffix")}</div>
            <div className="text-xl font-bold">+{formatNumber(totalCoins, locale)}</div>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {state.payments.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="card p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center overflow-hidden p-1.5">
                <img
                  src={p.method === "telegram_stars" ? "/telegram-stars.svg" : "/zarinpal-logo.png"}
                  alt={p.method}
                  className={
                    p.method === "telegram_stars"
                      ? "w-full h-full object-contain"
                      : "w-7 h-7 object-contain"
                  }
                />
              </div>

              <div className="flex-1">
                <div className="font-semibold">
                  {formatNumber(p.coins, locale)} {t("coins.suffix")}
                </div>
                <div className="text-xs text-[var(--muted)]">
                  {locale === "fa" ? toPersianDigits(p.date) : p.date} •{" "}
                  {p.method === "telegram_stars" ? "Telegram Stars" : "ZarinPal"}
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-green-400">
                  +${formatCurrency(p.amountUsd, locale)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </NoSSR>
  );
}
