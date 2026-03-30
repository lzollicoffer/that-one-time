import type { Metadata, Viewport } from "next";
import {
  Philosopher,
  Newsreader,
  Work_Sans,
  Manrope,
} from "next/font/google";
import { ServiceWorkerRegister } from "@/components/sw-register";
import "./globals.css";

const philosopher = Philosopher({
  variable: "--font-philosopher",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "That One Time | Historical Timelines",
    template: "%s | That One Time",
  },
  description:
    "An evolving collection of big and small moments. Explore curated historical timelines and their stories.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    siteName: "That One Time",
    title: "That One Time | Historical Timelines",
    description:
      "An evolving collection of big and small moments. Explore curated historical timelines and their stories.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "That One Time | Historical Timelines",
    description:
      "An evolving collection of big and small moments. Explore curated historical timelines.",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "That One Time",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#7D1F01",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${philosopher.variable} ${newsreader.variable} ${workSans.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
