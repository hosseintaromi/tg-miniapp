import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === "fa" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Tehran">
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
