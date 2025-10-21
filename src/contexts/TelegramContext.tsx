"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  TelegramUser,
  TelegramWebApp,
  getTelegram,
  getTelegramUser,
  isTelegramEnvironment,
  validateTelegramData,
  getTelegramInitData,
  setTelegramTheme,
  initializeTelegramBasics,
  type TelegramInitData,
} from "@/lib/telegram";
import { TelegramAuthService } from "@/services/telegram-auth";

interface TelegramContextType {
  webApp: TelegramWebApp | null;
  user: TelegramUser | null;
  initData: TelegramInitData | null;
  isLoading: boolean;
  isValidated: boolean;
  isTelegramEnv: boolean;
  authError: string | null;
  authService: TelegramAuthService;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

interface TelegramProviderProps {
  children: ReactNode;
}

export function TelegramProvider({ children }: TelegramProviderProps) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<TelegramInitData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const [isTelegramEnv, setIsTelegramEnv] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const authService = TelegramAuthService.getInstance();

  useEffect(() => {
    setIsClient(true);

    const initializeTelegram = async () => {
      try {
        const isTgEnv = isTelegramEnvironment();
        setIsTelegramEnv(isTgEnv);

        if (!isTgEnv) {
          // In non-Telegram environment, create a demo user
          const demoUser: TelegramUser = {
            id: 123456789,
            first_name: "کاربر",
            last_name: "نمونه",
            username: "demo_user",
            language_code: "fa",
            is_premium: false,
            allows_write_to_pm: true,
          };

          setUser(demoUser);
          setIsValidated(true);
          setIsLoading(false);
          return;
        }

        // Wait a bit for Telegram to be fully loaded
        setTimeout(() => {
          initializeTelegramBasics();
        }, 100);

        const tg = getTelegram();
        setWebApp(tg);

        if (tg) {
          const initDataResult = getTelegramInitData();
          const isBasicValid = validateTelegramData();

          setInitData(initDataResult);

          if (isBasicValid && initDataResult) {
            const authResult = authService.validateInitData(initDataResult);

            if (authResult.isValid && authResult.user) {
              setUser(authResult.user);
              setIsValidated(true);
              setAuthError(null);

              if (tg.initData) {
                try {
                  const backendValidation = await authService.validateWithBackend(tg.initData);
                  if (!backendValidation.isValid) {
                    console.warn("Backend validation failed:", backendValidation.error);
                    setAuthError(backendValidation.error || "Backend validation failed");
                  }
                } catch (error) {
                  console.warn("Backend validation unavailable:", error);
                }
              }
            } else {
              setAuthError(authResult.error || "Authentication failed");
              setIsValidated(false);
            }
          } else {
            setAuthError("Invalid Telegram data");
            setIsValidated(false);
          }

          // Set theme after hydration is complete
          const setThemeAfterHydration = () => {
            if (document.readyState === "complete") {
              setTimeout(() => setTelegramTheme(), 100);
            } else {
              window.addEventListener(
                "load",
                () => {
                  setTimeout(() => setTelegramTheme(), 100);
                },
                { once: true },
              );
            }
          };

          setThemeAfterHydration();

          tg.onEvent("themeChanged", () => {
            setThemeAfterHydration();
          });

          tg.onEvent("viewportChanged", () => {
            console.log("Viewport changed:", {
              height: tg.viewportHeight,
              stableHeight: tg.viewportStableHeight,
              isExpanded: tg.isExpanded,
            });
          });
        }
      } catch (error) {
        console.error("Error initializing Telegram WebApp:", error);
        setAuthError(
          `Initialization error: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      if (window.Telegram?.WebApp) {
        initializeTelegram();
      } else {
        const checkTelegram = setInterval(() => {
          if (window.Telegram?.WebApp) {
            clearInterval(checkTelegram);
            initializeTelegram();
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkTelegram);
          if (!window.Telegram?.WebApp) {
            setAuthError("Telegram WebApp not available");
          }
          setIsLoading(false);
        }, 5000);
      }
    } else {
      setIsLoading(false);
    }
  }, [authService]);

  const value: TelegramContextType = {
    webApp,
    user,
    initData,
    isLoading,
    isValidated,
    isTelegramEnv,
    authError,
    authService,
  };

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>;
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error("useTelegram must be used within a TelegramProvider");
  }
  return context;
}
