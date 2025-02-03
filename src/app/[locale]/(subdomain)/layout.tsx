
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import "./globals.css";
import PrelineScript from "@/app/components/PrelineScript";

// Server-side logic to fetch page title based on subdomain
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Load messages for the current locale
  const messages = await getMessages();

  const subdomain = "palm"; 

  // Dynamically get the page title based on the subdomain (palm or pineapple)
  const pageTitle =
    messages[subdomain]?.landing?.page?.title || "Crop Monitoring"; // Default to "Crop Monitoring"

  return (
    <html lang={locale} suppressHydrationWarning={true} className="bg-accent light">
      <head>
        <link rel="icon" href="DrangueMiniLogo.svg" />
        <title>{pageTitle}</title> 
      </head>
      <body className="antialiased light">
        <NextIntlClientProvider messages={messages}>
          <div className="relative h-svh">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
