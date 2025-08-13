import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { cn } from "@stackk/ui";
import { ThemeProvider } from "@stackk/ui/theme";

import { env } from "~/env";
import { TRPCReactProvider } from "~/lib/trpc/react";

import "@stackk/ui/globals.css";
import "~/nextjs.css";

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
          "bg-background text-foreground h-svh font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <NextTopLoader showSpinner={false} height={4} color="#6366f1" />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <NuqsAdapter>
              <main className="h-svh overflow-y-scroll">{props.children}</main>
            </NuqsAdapter>
          </TRPCReactProvider>

          <Toaster
            richColors
            className="toaster group"
            style={
              {
                "--normal-bg": "var(--popover)",
                "--normal-text": "var(--popover-foreground)",
                "--normal-border": "var(--border)",
              } as React.CSSProperties
            }
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
