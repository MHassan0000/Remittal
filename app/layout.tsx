import type { Metadata } from "next";
import { Commissioner, Familjen_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const commissioner = Commissioner({
  subsets: ["latin"],
  variable: "--font-commissioner",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: true,
});

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Remittal",
  description: "Courier COD payout reconciliation and dispute tracking for merchants.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${commissioner.variable} ${familjen.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
