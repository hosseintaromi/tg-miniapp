import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "fa"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./i18n/messages/${locale}.json`)).default,
  };
});
