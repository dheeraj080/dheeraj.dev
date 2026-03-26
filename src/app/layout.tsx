import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TransitionProvider } from "@/context/TransitionContext";
import Cursor from "@/components/Cursor";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-spacemono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Dheeraj Kamble — Backend Developer",
  description:
    "Backend developer building scalable, robust server-side systems and optimizing complex data architectures.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Dheeraj Kamble — Backend Developer",
    description: "Building scalable, robust server-side systems.",
    url: "https://dheerajkamble.com",
    siteName: "dheerajkamble.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dheeraj Kamble — Backend Developer",
    description: "Building scalable, robust server-side systems.",
  },
  metadataBase: new URL("https://dheerajkamble.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${bebasNeue.variable} ${barlowCondensed.variable} ${spaceMono.variable}`}
      >
        {/* Grain paper texture — fixed, above everything except cursor */}
        <div className="grain-layer" aria-hidden="true" />
        <Cursor />
        <TransitionProvider>{children}</TransitionProvider>
        <Analytics />
      </body>
    </html>
  );
}
