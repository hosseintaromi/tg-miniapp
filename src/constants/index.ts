import type { CoinPack } from "@/types";

export const STORAGE_KEY = "tgminiapp-state-v1";

export const COIN_PACKS: CoinPack[] = [
  {
    id: "pk100",
    coins: 100,
    priceUsd: 1.99,
    image: "/photo_2025-10-14 15.30.22.jpeg",
  },
  {
    id: "pk500",
    coins: 500,
    priceUsd: 7.99,
    popular: true,
    image: "/abbas-agha-logo.jpeg",
  },
  {
    id: "pk1000",
    coins: 1000,
    priceUsd: 14.99,
    discount: 10,
    image: "/zarin-palpng.parspng.com_.png",
  },
  {
    id: "pk2000",
    coins: 2000,
    priceUsd: 24.99,
    discount: 15,
    image: "/photo_2025-10-14 15.30.22.jpeg",
  },
];

export const PAYMENT_METHODS = [
  {
    id: "telegram_stars" as const,
    name: "Telegram Stars",
    icon: "/telegram-stars.svg",
    description: "Pay with Telegram Stars",
  },
  {
    id: "zarinpal" as const,
    name: "ZarinPal",
    icon: "/zarinpal-logo.png",
    description: "پرداخت با زرین‌پال",
  },
];
