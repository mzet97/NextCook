import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import FooterContent from "@/components/FooterContent";

// Using system fonts for better reliability and performance
// You can add Google Fonts back when you have internet access during build
// Example:
// import { Inter, JetBrains_Mono } from "next/font/google";
// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','),
    authors: [{ name: t('author') }],
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get messages for the current locale
  const messages = await getMessages();

  // Get current locale from cookies
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'pt';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className="font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <FooterContent />
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
