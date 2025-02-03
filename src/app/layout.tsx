import "./globals.css";
import Navbar from "@/components/ui/home/Navbar";
import PrelineScript from "@/app/components/PrelineScript";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark  bg-neutral-950" suppressHydrationWarning>
      <head>
        <title>DRANGUE</title>
      </head>
      <body className="h-screen">
          <div className="flex min-h-full flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
          </div>
      </body>
      <PrelineScript />
    </html>
  );
}