"use client";
import { COIN_PACKS, useAppState } from "@/services/store";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function BuyCoinsPage() {
  const { actions } = useAppState();
  const t = useTranslations();
  const [selected, setSelected] = useState(COIN_PACKS[0].id);
  const pack = COIN_PACKS.find((p) => p.id === selected)!;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-1">{t("buy.choose")}</h2>
      <div className="flex flex-col gap-3">
        {COIN_PACKS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`card p-4 text-left ${selected === p.id ? "ring-2 ring-[var(--brand)]" : ""}`}
          >
            <div className="flex items-center gap-3">
              <img
                src={p.image}
                alt={`${p.coins} coins`}
                className="w-16 h-10 rounded-md object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold">
                  {p.coins.toLocaleString()} {t("coins.suffix")}
                </div>
                <div className="text-[var(--muted)]">${p.priceUsd.toFixed(2)}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <button className="btn-primary p-4 mt-2" onClick={() => actions.buyPack(pack)}>
        {t("buy.cta")}
      </button>
    </div>
  );
}
