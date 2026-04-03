import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: {
    default: "AfroCinema — Discover Nollywood, Bollywood & Hollywood",
    template: "%s | AfroCinema",
  },
  description:
    "The best place to discover and watch Nollywood, Bollywood, and Hollywood movies. Find where to stream or watch free on YouTube.",
  keywords: [
    "nollywood movies",
    "bollywood movies",
    "hollywood movies",
    "african cinema",
    "nigerian movies online",
    "watch nollywood free",
    "best nollywood movies",
  ],
  authors: [{ name: "AfroCinema" }],
  creator: "AfroCinema",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://afrocinema.netlify.app",
    siteName: "AfroCinema",
    title: "AfroCinema — Discover Nollywood, Bollywood & Hollywood",
    description:
      "Discover and watch the best Nollywood, Bollywood, and Hollywood movies in one place.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AfroCinema",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AfroCinema",
    description: "Discover Nollywood, Bollywood & Hollywood movies",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AfroCinema" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ServiceWorkerRegister />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
