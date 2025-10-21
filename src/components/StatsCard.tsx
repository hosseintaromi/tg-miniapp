import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  delay?: number;
}

export function StatsCard({ label, value, icon, variant = "default", delay = 0 }: StatsCardProps) {
  const variantStyles = {
    default: "text-[var(--foreground)]",
    success: "text-green-400",
    warning: "text-yellow-400",
    danger: "text-red-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="card p-4 text-center"
    >
      {icon && <div className="mb-2 flex justify-center">{icon}</div>}
      <div className="text-xs text-[var(--muted)] mb-1">{label}</div>
      <div className={`text-xl font-bold ${variantStyles[variant]}`}>{value}</div>
    </motion.div>
  );
}
