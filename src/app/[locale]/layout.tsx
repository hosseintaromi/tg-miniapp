import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ClientProviders } from "../providers";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>
            <AppShell>{children}</AppShell>
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
