"use client";

import { motion } from "framer-motion";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function Loading({ size = "md", text }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} border-2 border-[var(--brand)]/20 border-t-[var(--brand)] rounded-full mb-2`}
      />
      {text && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-[var(--muted)]"
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
}

export function LoadingSkeleton() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--surface-2)] rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[var(--surface-2)] rounded animate-pulse" />
              <div className="h-3 bg-[var(--surface-2)] rounded w-2/3 animate-pulse" />
            </div>
            <div className="w-16 h-6 bg-[var(--surface-2)] rounded animate-pulse" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
