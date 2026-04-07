import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: "Vilanir OS — Portfolio",
  description: "José Vilanir — Full Stack, Mobile & Data Engineer",
  openGraph: {
    title: "Vilanir OS — Portfolio",
    description: "José Vilanir — Full Stack, Mobile & Data Engineer",
    siteName: "Vilanir OS",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vilanir OS — Portfolio" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vilanir OS — Portfolio",
    description: "José Vilanir — Full Stack, Mobile & Data Engineer",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/computador.png",
    shortcut: "/computador.png",
    apple: "/computador.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="h-full overflow-hidden" suppressHydrationWarning>{children}</body>
    </html>
  );
}
