export function CoinBadge({ amount, sign = "" }: { amount: number; sign?: "+" | "-" | "" }) {
  const unit = amount === 1 ? "Coin" : "Coins";
  const formatted = `${sign}${Math.abs(amount)} ${unit}`;
  return (
    <div className="px-3 py-1 rounded-md bg-[var(--surface-2)] font-semibold">{formatted}</div>
  );
}
