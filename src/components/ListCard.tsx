import type { ReactNode } from "react";

export function ListCard({
  leading,
  title,
  subtitle,
  trailing,
}: {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className="card p-4 flex items-center gap-3">
      {leading ? (
        <div className="w-10 h-10 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--brand)]">
          {leading}
        </div>
      ) : null}
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        {subtitle ? <div className="text-[var(--muted)] text-sm">{subtitle}</div> : null}
      </div>
      {trailing}
    </div>
  );
}
