import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  icon: string;
  onClick: () => void;
  delay?: number;
}

export function FeatureCard({ title, icon, onClick, delay = 0 }: FeatureCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="card p-4 text-center hover:bg-[var(--brand)]/5 transition-colors"
    >
      <div className="mb-3 flex justify-center">
        <img src={icon} alt={title} className="w-16 h-16 object-contain" />
      </div>
      <div className="text-sm font-semibold">{title}</div>
    </motion.button>
  );
}
