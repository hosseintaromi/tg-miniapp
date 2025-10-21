"use client";
import { useTranslations } from "next-intl";
import { useAppState } from "@/services/store";
import { useTelegram } from "@/contexts/TelegramContext";
import { motion } from "framer-motion";
import { NoSSR } from "@/components/NoSSR";

export default function ProfilePage() {
  const t = useTranslations();

  return (
    <NoSSR
      fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center p-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-[var(--brand)]/20 border-t-[var(--brand)] rounded-full mb-4"
          />
          <span className="text-sm text-[var(--muted)]">Loading profile...</span>
        </motion.div>
      }
    >
      <ProfileContent />
    </NoSSR>
  );
}

function ProfileContent() {
  const t = useTranslations();
  const { state } = useAppState();
  const { user, isLoading, isValidated, isTelegramEnv, authError, authService } = useTelegram();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[var(--brand)]/20 border-t-[var(--brand)] rounded-full mb-4"
        />
        <span className="text-sm text-[var(--muted)]">Loading profile...</span>
      </motion.div>
    );
  }

  if (!isValidated || !user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4"
        >
          <span className="text-2xl">⚠️</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-red-500 text-center"
        >
          <h3 className="text-lg font-semibold mb-2">خطا در احراز هویت</h3>
          <p className="text-sm text-[var(--muted)] mb-4">
            {authError || "داده‌های تلگرام نامعتبر است"}
          </p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="btn-primary px-6 py-2 rounded-lg font-semibold"
          >
            تلاش مجدد
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col items-center gap-3 mt-4"
      >
        {user.photo_url ? (
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-28 h-28 rounded-full object-cover"
            src={user.photo_url}
            alt={`${user.first_name}'s profile`}
          />
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-28 h-28 rounded-full bg-[var(--brand)] flex items-center justify-center"
          >
            <span className="text-black text-3xl font-semibold">
              {authService.getUserInitials(user)}
            </span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xl font-semibold"
        >
          {user.first_name}
          {user.last_name && ` ${user.last_name}`}
        </motion.div>

        {user.username && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-[var(--muted)]"
          >
            @{user.username}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex items-center gap-2 text-xs flex-wrap justify-center"
        >
          <span className="text-[var(--muted)]">ID: {user.id}</span>
          {user.language_code && (
            <span className="text-[var(--muted)]">• {user.language_code.toUpperCase()}</span>
          )}
          {!isTelegramEnv && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
            >
              حالت نمایشی
            </motion.span>
          )}
          {authService.isUserPremium(user) && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
            >
              Premium
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="card p-4"
      >
        <div className="text-sm text-[var(--muted)] mb-2">{t("profile.balance")}</div>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
          className="text-lg font-semibold"
        >
          {state.balance.toLocaleString()} {t("coins.suffix")}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
