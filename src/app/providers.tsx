"use client";
import { useEffect, useState } from "react";
import { initializeTelegramBasics } from "@/lib/telegram";
import { TelegramProvider } from "@/contexts/TelegramContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SplashScreen } from "@/components/SplashScreen";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // Initialize Telegram only after client is ready
    setTimeout(() => {
      initializeTelegramBasics();
    }, 50);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ThemeProvider>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <TelegramProvider>{children}</TelegramProvider>
      )}
    </ThemeProvider>
  );
}
