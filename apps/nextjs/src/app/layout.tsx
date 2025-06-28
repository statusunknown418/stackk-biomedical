import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { cn } from "@stackk/ui";
import { ThemeProvider, ThemeToggle } from "@stackk/ui/theme";
import { Toaster } from "@stackk/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";

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
          "min-h-screen bg-background font-sans text-foreground antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>

          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
