"use client";
import { useAppState } from "@/services/store";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import { COIN_PACKS } from "@/constants";
import { PaymentBottomSheet } from "@/components/PaymentBottomSheet";
import { NoSSR } from "@/components/NoSSR";
import type { PaymentMethod } from "@/types";

export default function BuyCoinsPage() {
  const { actions } = useAppState();
  const t = useTranslations();
  const [selected, setSelected] = useState(COIN_PACKS[0].id);
  const [showPayment, setShowPayment] = useState(false);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const pack = COIN_PACKS.find((p) => p.id === selected)!;

  const handlePayment = (method: PaymentMethod) => {
    actions.buyPack(pack, method);
  };

  return (
    <NoSSR>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4 px-4"
      >
        <div className="card p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--muted)] mb-1">{t("buy.choose")}</div>
            <div className="text-xl font-bold">
              {pack.coins.toLocaleString()} {t("coins.suffix")}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[var(--muted)]">${pack.priceUsd.toFixed(2)}</div>
            {pack.discount && <div className="text-xs text-green-400">{pack.discount}% تخفیف</div>}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {COIN_PACKS.map((p) => (
            <motion.button
              key={p.id}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
              onClick={() => setSelected(p.id)}
              className={`card p-4 text-left transition-all duration-200 ${selected === p.id ? "ring-2 ring-[var(--brand)] bg-[var(--brand)]/5" : ""}`}
            >
              <div className="flex items-center gap-3">
                {!brokenImages.has(p.id) && p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.coins} coins`}
                    className="w-16 h-10 rounded-md object-cover"
                    onError={() => setBrokenImages((prev) => new Set(prev).add(p.id))}
                  />
                ) : (
                  <div className="w-16 h-10 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <span className="text-2xl">🪙</span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">
                      {p.coins.toLocaleString()} {t("coins.suffix")}
                    </span>
                    {p.popular && (
                      <span className="text-xs bg-[var(--brand)] text-black px-2 py-1 rounded-full">
                        محبوب
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--muted)]">${p.priceUsd.toFixed(2)}</span>
                    {p.discount && (
                      <span className="text-xs text-green-400">{p.discount}% تخفیف</span>
                    )}
                  </div>
                </div>
                {selected === p.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="w-6 h-6 rounded-full bg-[var(--brand)] flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-black" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
          className="btn-primary p-4 mt-2 font-semibold"
          onClick={() => setShowPayment(true)}
        >
          {t("buy.cta")}
        </motion.button>

        <PaymentBottomSheet
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          coinPack={pack}
          onPayment={handlePayment}
        />
      </motion.div>
    </NoSSR>
  );
}
