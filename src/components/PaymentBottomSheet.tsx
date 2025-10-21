"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { CoinPack, PaymentMethod } from "@/types";
import { PAYMENT_METHODS } from "@/constants";

interface PaymentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  coinPack: CoinPack;
  onPayment: (method: PaymentMethod) => void;
}

export function PaymentBottomSheet({
  isOpen,
  onClose,
  coinPack,
  onPayment,
}: PaymentBottomSheetProps) {
  const t = useTranslations();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("telegram_stars");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    onPayment(selectedMethod);
    setIsProcessing(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-[var(--surface)] z-50 rounded-t-3xl"
          >
            <div className="container-safe p-6">
              {/* Handle */}
              <div className="w-12 h-1 bg-[var(--muted)] rounded-full mx-auto mb-6" />

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2">تأیید خرید</h2>
                <p className="text-[var(--muted)]">جزئیات سفارش شما</p>
              </div>

              {/* Coin Pack Details */}
              <div className="card p-4 mb-6">
                <div className="flex items-center gap-4">
                  {coinPack.image && (
                    <img
                      src={coinPack.image}
                      alt={`${coinPack.coins} coins`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold">
                        {coinPack.coins.toLocaleString()} {t("coins.suffix")}
                      </span>
                      {coinPack.popular && (
                        <span className="text-xs bg-[var(--brand)] text-black px-2 py-1 rounded-full">
                          محبوب
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-[var(--brand)]">
                        ${coinPack.priceUsd.toFixed(2)}
                      </span>
                      {coinPack.discount && (
                        <span className="text-sm text-green-400">{coinPack.discount}% تخفیف</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">روش پرداخت</h3>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-colors ${
                        selectedMethod === method.id
                          ? "border-[var(--brand)] bg-[var(--brand)]/10"
                          : "border-[var(--surface-2)] bg-[var(--surface-2)]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                          <img
                            src={method.icon}
                            alt={method.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div className="flex-1 text-right">
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-sm text-[var(--muted)]">{method.description}</div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            selectedMethod === method.id
                              ? "border-[var(--brand)] bg-[var(--brand)]"
                              : "border-[var(--muted)]"
                          }`}
                        >
                          {selectedMethod === method.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full rounded-full bg-[var(--brand)] flex items-center justify-center"
                            >
                              <div className="w-2 h-2 rounded-full bg-black" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="flex-1 p-4 rounded-xl border border-[var(--muted)] text-[var(--muted)] font-semibold disabled:opacity-50"
                >
                  انصراف
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 btn-primary font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                      />
                      در حال پردازش...
                    </>
                  ) : (
                    `پرداخت $${coinPack.priceUsd.toFixed(2)}`
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
