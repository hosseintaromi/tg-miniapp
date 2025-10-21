export type CoinPack = {
  id: string;
  coins: number;
  priceUsd: number;
  image?: string;
  popular?: boolean;
  discount?: number;
};

export type PaymentMethod = "telegram_stars" | "zarinpal";

export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled";

export type Payment = {
  id: string;
  coins: number;
  amountUsd: number;
  date: string;
  status: PaymentStatus;
  method?: PaymentMethod;
};

export type ConsumptionRecord = {
  id: string;
  title: string;
  subtitle: string;
  titleKey?: string;
  subtitleKey?: string;
  coins: number;
  date: string;
  metadata?: Record<string, unknown>;
};

export type AppState = {
  balance: number;
  payments: Payment[];
  consumptions: ConsumptionRecord[];
};

export type LoadingState = {
  isLoading: boolean;
  error: string | null;
};
