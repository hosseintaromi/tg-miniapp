"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 2000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  // Get theme colors
  const getThemeGradient = () => {
    switch (theme) {
      case "orange":
        return "from-[#ff8c42] to-[#e67429]";
      case "green":
        return "from-[#7cff3a] to-[#44cc1b]";
      case "blue":
        return "from-[#42a5ff] to-[#2985e6]";
      default:
        return "from-[var(--brand)] to-[var(--brand-700)]";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br ${getThemeGradient()}`}
        >
          <div className="text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden"
            >
              <img
                src="/abbas-agha-logo.jpeg"
                alt="عباس آقا"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* App Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-2xl font-bold text-black mb-2"
            >
              عباس آقا
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-black/70 mb-8"
            >
              مدیریت سکه‌ها و پرداخت‌ها
            </motion.p>

            {/* Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="flex justify-center"
            >
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-2 h-2 bg-black/60 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
