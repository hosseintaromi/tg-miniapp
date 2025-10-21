"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { NoSSR } from "@/components/NoSSR";

export default function LocaleHome() {
  const t = useTranslations();

  return (
    <NoSSR>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          className="w-20 h-20 bg-[var(--brand)] rounded-2xl flex items-center justify-center mb-6"
        >
          <span className="text-2xl font-bold text-black">tg</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          {t("app.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-[var(--muted)] mb-8"
        >
          {t("app.welcome")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-2 gap-4 w-full max-w-sm"
        >
          <div className="card p-4 text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm font-semibold">مدیریت سکه</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl mb-2">💳</div>
            <div className="text-sm font-semibold">پرداخت آسان</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-semibold">گزارش مصرف</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm font-semibold">پروفایل کاربر</div>
          </div>
        </motion.div>
      </motion.div>
    </NoSSR>
  );
}
