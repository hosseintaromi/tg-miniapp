"use client";
import { useEffect } from "react";
import { initializeTelegramBasics } from "@/lib/telegram";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeTelegramBasics();
  }, []);
  return <>{children}</>;
}
