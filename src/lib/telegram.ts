export type TelegramWebApp = {
  themeParams?: Record<string, string>;
  colorScheme?: "light" | "dark";
  BackButton?: { show: () => void; hide: () => void; onClick: (cb: () => void) => void };
  onEvent?: (event: string, cb: () => void) => void;
  initDataUnsafe?: unknown;
  ready?: () => void;
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

export function getTelegram(): TelegramWebApp | null {
  if (typeof window === "undefined") return null;
  const tg = window.Telegram?.WebApp as TelegramWebApp | undefined;
  return tg ?? null;
}

export function initializeTelegramBasics(): void {
  const tg = getTelegram();
  if (!tg) return;
  tg.ready?.();
}
