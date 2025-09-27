import { useEffect, useMemo, useState } from "react";
import type { AppState, CoinPack, ConsumptionRecord, Payment } from "@/types";

const STORAGE_KEY = "tgminiapp-state-v1";

const initialState: AppState = {
  balance: 1250,
  payments: [
    { id: "p1", coins: 100, amountUsd: 10, date: "2024-01-15" },
    { id: "p2", coins: 50, amountUsd: 5, date: "2023-12-20" },
    { id: "p3", coins: 200, amountUsd: 20, date: "2023-11-05" },
    { id: "p4", coins: 75, amountUsd: 7.5, date: "2023-10-10" },
  ],
  consumptions: [
    { id: "c1", title: "Boost Post", subtitle: "Feature Usage", coins: -50, date: "2024-01-10" },
    {
      id: "c2",
      title: "Promote Profile",
      subtitle: "Feature Usage",
      coins: -100,
      date: "2024-01-08",
    },
    {
      id: "c3",
      title: "Unlock Premium Content",
      subtitle: "Feature Usage",
      coins: -25,
      date: "2024-01-02",
    },
    {
      id: "c4",
      title: "Send Virtual Gifts",
      subtitle: "Feature Usage",
      coins: -75,
      date: "2023-12-30",
    },
  ],
};

export function useAppState() {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window === "undefined") return initialState;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AppState) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const actions = useMemo(() => {
    return {
      buyPack(pack: CoinPack) {
        setState((s) => ({
          ...s,
          balance: s.balance + pack.coins,
          payments: [
            {
              id: `p${Date.now()}`,
              coins: pack.coins,
              amountUsd: pack.priceUsd,
              date: new Date().toISOString().slice(0, 10),
            },
            ...s.payments,
          ],
        }));
      },
      consume(record: Omit<ConsumptionRecord, "id" | "date"> & { coins: number }) {
        setState((s) => ({
          ...s,
          balance: s.balance + record.coins,
          consumptions: [
            { id: `c${Date.now()}`, date: new Date().toISOString().slice(0, 10), ...record },
            ...s.consumptions,
          ],
        }));
      },
    };
  }, []);

  return { state, actions };
}

export const COIN_PACKS: CoinPack[] = [
  { id: "pk100", coins: 100, priceUsd: 1.99, image: "/images/packs/100.png" },
  { id: "pk500", coins: 500, priceUsd: 7.99, image: "/images/packs/500.png" },
  { id: "pk1000", coins: 1000, priceUsd: 14.99, image: "/images/packs/1000.png" },
  { id: "pk2000", coins: 2000, priceUsd: 24.99, image: "/images/packs/2000.png" },
];
