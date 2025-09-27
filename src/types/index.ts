export type CoinPack = {
  id: string;
  coins: number;
  priceUsd: number;
  image?: string;
};

export type Payment = {
  id: string;
  coins: number;
  amountUsd: number;
  date: string;
};

export type ConsumptionRecord = {
  id: string;
  title?: string;
  subtitle?: string;
  titleKey?: string;
  subtitleKey?: string;
  coins: number;
  date: string;
};

export type AppState = {
  balance: number;
  payments: Payment[];
  consumptions: ConsumptionRecord[];
};
