import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { cn } from "@stackk/ui";
import { Toaster } from "@stackk/ui/sonner";
import { ThemeProvider } from "@stackk/ui/theme";

import "@stackk/ui/globals.css";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://stackk-biomedical.vercel.app"
      : "http://localhost:3000",
  ),
  title: "Stackk Biomedical",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Stackk Biomedical",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://stackk-biomedical.vercel.app",
    siteName: "Stackk Biomedical",
  },
  twitter: {
    card: "summary_large_image",
    site: "@alvaro_dotdev",
    creator: "@alvaro_dotdev",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground min-h-svh font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <main className="min-h-svh">{props.children}</main>
          </TRPCReactProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
