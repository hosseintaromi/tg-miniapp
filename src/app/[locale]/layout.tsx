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

  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Tehran">
      <ClientProviders>
        <AppShell>{children}</AppShell>
      </ClientProviders>
    </NextIntlClientProvider>
  );
}
