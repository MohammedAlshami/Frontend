import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import PrelineScript from "@/app/components/PrelineScript";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Load messages for the current locale
  const messages = await getMessages();

  // Determine which crop data to use (either "palm" or "pineapple")
  const cropData = messages[locale]?.palm || messages[locale]?.pineapple; // Adjust based on the locale structure

  // Set the page title dynamically based on the locale and crop
  const cropName = cropData?.landing?.page?.title || "Crop Monitoring";
  const pageTitle = `${cropName} - Palm Oil`;  // Here we are appending "Palm Oil"

  return (
    <html
      lang={locale}
      suppressHydrationWarning={true}
      className="bg-accent light"
    >
      <head>
        <link rel="icon" href="DrangueMiniLogo.svg" />
        <title>{pageTitle}</title> {/* Set the dynamic title here */}
      </head>
      <body className="antialiased light">
        <NextIntlClientProvider messages={messages}>
          <div className="relative h-svh">
            {/* Content */}
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
