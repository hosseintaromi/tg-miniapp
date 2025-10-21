import { motion } from "framer-motion";
import { CoinBadge } from "./CoinBadge";
import type { Consumption } from "@/types";

interface ConsumptionCardProps {
  consumption: Consumption;
  title: string;
  subtitle?: string;
  delay?: number;
}

export function ConsumptionCard({ consumption, title, subtitle, delay = 0 }: ConsumptionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="card p-4 flex items-center gap-3"
    >
      <div className="w-9 h-9 rounded-lg bg-[var(--surface)] flex items-center justify-center">
        <span className="text-lg">◎</span>
      </div>
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        {subtitle && <div className="text-xs text-[var(--muted)]">{subtitle}</div>}
      </div>
      <CoinBadge amount={consumption.coins} sign="-" />
    </motion.div>
  );
}
