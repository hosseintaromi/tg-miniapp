import { useEffect, useMemo, useState } from "react";
import type { AppState, CoinPack, ConsumptionRecord, PaymentMethod } from "@/types";
import { STORAGE_KEY } from "@/constants";

const initialState: AppState = {
  balance: 1250,
  payments: [
    {
      id: "p1",
      coins: 100,
      amountUsd: 10,
      date: "2024-01-15",
      status: "completed",
      method: "telegram_stars",
    },
    {
      id: "p2",
      coins: 50,
      amountUsd: 5,
      date: "2023-12-20",
      status: "completed",
      method: "zarinpal",
    },
    {
      id: "p3",
      coins: 200,
      amountUsd: 20,
      date: "2023-11-05",
      status: "completed",
      method: "telegram_stars",
    },
    {
      id: "p4",
      coins: 75,
      amountUsd: 7.5,
      date: "2023-10-10",
      status: "completed",
      method: "zarinpal",
    },
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
  const [state, setState] = useState<AppState>(initialState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          setState(JSON.parse(raw) as AppState);
        }
      } catch {
        // Keep initial state if localStorage fails
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
    }
  }, [state, isClient]);

  const actions = useMemo(() => {
    return {
      buyPack(pack: CoinPack, method: PaymentMethod) {
        setState((s) => ({
          ...s,
          balance: s.balance + pack.coins,
          payments: [
            {
              id: `p${Date.now()}`,
              coins: pack.coins,
              amountUsd: pack.priceUsd,
              date: new Date().toISOString().slice(0, 10),
              status: "completed" as const,
              method,
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
