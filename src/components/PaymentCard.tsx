import { motion } from "framer-motion";
import type { Payment } from "@/types";

interface PaymentCardProps {
  payment: Payment;
  locale: string;
  formatNumber: (num: number, locale: string) => string;
  formatCurrency: (num: number, locale: string) => string;
  toPersianDigits: (str: string) => string;
  coinsLabel: string;
  delay?: number;
}

export function PaymentCard({
  payment,
  locale,
  formatNumber,
  formatCurrency,
  toPersianDigits,
  coinsLabel,
  delay = 0,
}: PaymentCardProps) {
  const methodIcon =
    payment.method === "telegram_stars" ? "/telegram-stars.svg" : "/zarinpal-logo.png";
  const methodName = payment.method === "telegram_stars" ? "Telegram Stars" : "ZarinPal";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="card p-4 flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center overflow-hidden p-1.5">
        <img
          src={methodIcon}
          alt={payment.method}
          className={
            payment.method === "telegram_stars"
              ? "w-full h-full object-contain"
              : "w-7 h-7 object-contain"
          }
        />
      </div>

      <div className="flex-1">
        <div className="font-semibold">
          {formatNumber(payment.coins, locale)} {coinsLabel}
        </div>
        <div className="text-xs text-[var(--muted)]">
          {locale === "fa" ? toPersianDigits(payment.date) : payment.date} • {methodName}
        </div>
      </div>

      <div className="text-right">
        <div className="font-semibold text-green-400">
          +${formatCurrency(payment.amountUsd, locale)}
        </div>
      </div>
    </motion.div>
  );
}
