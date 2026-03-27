import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nedre Vesterdal Savings Bank',
  description: 'Your local bank for over 80 years',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'no')) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-[#f5f5f5] text-[#1a1a1a] min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
