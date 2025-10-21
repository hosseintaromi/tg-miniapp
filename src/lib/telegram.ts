export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
  allows_write_to_pm?: boolean;
};

export type TelegramInitData = {
  user?: TelegramUser;
  auth_date: number;
  hash: string;
  query_id?: string;
  chat_type?: string;
  chat_instance?: string;
  start_param?: string;
};

export type TelegramWebApp = {
  initData: string;
  initDataUnsafe: TelegramInitData;
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
    header_bg_color?: string;
    accent_text_color?: string;
    section_bg_color?: string;
    section_header_text_color?: string;
    subtitle_text_color?: string;
    destructive_text_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive?: boolean): void;
    hideProgress(): void;
    setParams(params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }): void;
  };
  HapticFeedback: {
    impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
    notificationOccurred(type: "error" | "success" | "warning"): void;
    selectionChanged(): void;
  };
  CloudStorage: {
    setItem(
      key: string,
      value: string,
      callback?: (error: string | null, success: boolean) => void,
    ): void;
    getItem(key: string, callback: (error: string | null, value: string | null) => void): void;
    getItems(
      keys: string[],
      callback: (error: string | null, values: Record<string, string>) => void,
    ): void;
    removeItem(key: string, callback?: (error: string | null, success: boolean) => void): void;
    removeItems(keys: string[], callback?: (error: string | null, success: boolean) => void): void;
    getKeys(callback: (error: string | null, keys: string[]) => void): void;
  };
  ready(): void;
  expand(): void;
  close(): void;
  sendData(data: string): void;
  switchInlineQuery(query: string, choose_chat_types?: string[]): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: (status: string) => void): void;
  showPopup(
    params: {
      title?: string;
      message: string;
      buttons?: Array<{
        id?: string;
        type?: "default" | "ok" | "close" | "cancel" | "destructive";
        text: string;
      }>;
    },
    callback?: (buttonId: string) => void,
  ): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showScanQrPopup(params: { text?: string }, callback?: (text: string) => void): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback?: (text: string) => void): void;
  requestWriteAccess(callback?: (granted: boolean) => void): void;
  requestContact(callback?: (granted: boolean) => void): void;
  onEvent(eventType: string, eventHandler: () => void): void;
  offEvent(eventType: string, eventHandler: () => void): void;
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
  // Only run in client-side
  if (typeof window === "undefined") return;

  const tg = getTelegram();
  if (!tg) return;
  tg.ready();
  tg.expand();
}

export function getTelegramUser(): TelegramUser | null {
  const tg = getTelegram();
  if (!tg || !tg.initDataUnsafe?.user) return null;
  return tg.initDataUnsafe.user;
}

export function isTelegramEnvironment(): boolean {
  return typeof window !== "undefined" && !!window.Telegram?.WebApp;
}

export function validateTelegramData(): boolean {
  const tg = getTelegram();
  if (!tg) return false;

  return !!(
    tg.initDataUnsafe &&
    tg.initDataUnsafe.user &&
    tg.initDataUnsafe.auth_date &&
    tg.initDataUnsafe.hash
  );
}

export function getTelegramInitData(): TelegramInitData | null {
  const tg = getTelegram();
  if (!tg || !validateTelegramData()) return null;
  return tg.initDataUnsafe;
}

export function setTelegramTheme(): void {
  // Only run in client-side and after hydration
  if (typeof window === "undefined" || !document.documentElement) return;

  const tg = getTelegram();
  if (!tg || !tg.themeParams) return;

  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    const root = document.documentElement;
    const theme = tg.themeParams;

    if (theme.bg_color) {
      root.style.setProperty("--tg-bg-color", theme.bg_color);
    }
    if (theme.text_color) {
      root.style.setProperty("--tg-text-color", theme.text_color);
    }
    if (theme.button_color) {
      root.style.setProperty("--tg-button-color", theme.button_color);
    }
    if (theme.button_text_color) {
      root.style.setProperty("--tg-button-text-color", theme.button_text_color);
    }
    if (theme.link_color) {
      root.style.setProperty("--tg-theme-link-color", theme.link_color);
    }
    if (theme.hint_color) {
      root.style.setProperty("--tg-theme-hint-color", theme.hint_color);
    }
  });
}
