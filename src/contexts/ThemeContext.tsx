"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "orange" | "green" | "blue";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = {
  orange: {
    background: "#1a0f0a",
    surface: "#2d1b12",
    surface2: "#241610",
    foreground: "#f5e6d3",
    muted: "#b8a08a",
    brand: "#ff8c42",
    brand700: "#e67429",
  },
  green: {
    background: "#0f1a10",
    surface: "#0e2715",
    surface2: "#0b2012",
    foreground: "#e7f3e9",
    muted: "#9fb4a5",
    brand: "#7cff3a",
    brand700: "#44cc1b",
  },
  blue: {
    background: "#0a0f1a",
    surface: "#122d2d",
    surface2: "#102424",
    foreground: "#d3e6f5",
    muted: "#8aa0b8",
    brand: "#42a5ff",
    brand700: "#2985e6",
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("orange");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load theme from localStorage only on client
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("app-theme") as Theme;
      if (savedTheme && themes[savedTheme]) {
        setThemeState(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables only on client after hydration
    if (!isClient || typeof window === "undefined") return;

    requestAnimationFrame(() => {
      const themeColors = themes[theme];
      const root = document.documentElement;

      root.style.setProperty("--background", themeColors.background);
      root.style.setProperty("--surface", themeColors.surface);
      root.style.setProperty("--surface-2", themeColors.surface2);
      root.style.setProperty("--foreground", themeColors.foreground);
      root.style.setProperty("--muted", themeColors.muted);
      root.style.setProperty("--brand", themeColors.brand);
      root.style.setProperty("--brand-700", themeColors.brand700);
    });
  }, [theme, isClient]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("app-theme", newTheme);
    }
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
