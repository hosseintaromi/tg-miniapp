/**
 * Convert English digits to Persian/Farsi digits
 */
export function toPersianDigits(num: number | string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

/**
 * Format number with locale-specific digits and separators
 */
export function formatNumber(num: number, locale: string = "fa"): string {
  if (locale === "fa") {
    const formatted = num.toLocaleString("en-US");
    return toPersianDigits(formatted);
  }
  return num.toLocaleString("en-US");
}

/**
 * Format currency with locale-specific digits
 */
export function formatCurrency(amount: number, locale: string = "fa"): string {
  const formatted = amount.toFixed(2);
  if (locale === "fa") {
    return toPersianDigits(formatted);
  }
  return formatted;
}
