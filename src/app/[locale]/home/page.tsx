"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { NoSSR } from "@/components/NoSSR";
import { useParams, useRouter } from "next/navigation";

export default function HomePage() {
  const t = useTranslations();
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale = params?.locale ?? "fa";

  const cards = [
    {
      title: "مدیریت سکه",
      icon: "/Wallet.svg",
      href: `/${locale}/buy-coins`,
    },
    {
      title: "پرداخت آسان",
      icon: "/Payment.svg",
      href: `/${locale}/payments`,
    },
    {
      title: "گزارش مصرف",
      icon: "/Analytics.svg",
      href: `/${locale}/consumption`,
    },
    {
      title: "پروفایل کاربر",
      icon: "/User.svg",
      href: `/${locale}/profile`,
    },
  ];

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
          className="w-20 h-20 rounded-2xl overflow-hidden mb-6"
        >
          <img src="/abbas-agha-logo.jpeg" alt="عباس آقا" className="w-full h-full object-cover" />
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
          {cards.map((card, index) => (
            <motion.button
              key={card.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(card.href)}
              className="card p-4 text-center hover:bg-[var(--brand)]/5 transition-colors"
            >
              <div className="mb-3 flex justify-center">
                <img src={card.icon} alt={card.title} className="w-16 h-16 object-contain" />
              </div>
              <div className="text-sm font-semibold">{card.title}</div>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </NoSSR>
  );
}
