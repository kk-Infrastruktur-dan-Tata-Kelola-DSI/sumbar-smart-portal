import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { ThemeSwitch } from "@/components/theme-switch";

export const metadata: Metadata = {
  title: "Sumbar Smart Portal",
  description: "Sumbar Smart Portal",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ThemeSwitch className="fixed top-4 right-4" />
          <main className="container mx-auto max-w-4xl px-6 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
