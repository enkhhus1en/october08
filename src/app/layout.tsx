import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "./components/header";
import { Tracker } from "./components/tracker";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: ":]",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmMono.variable} ${inter.variable} antialiased`}>
        <div className="flex flex-col items-center min-h-screen">
          <div className="w-full max-w-3xl p-4">
            <ThemeProvider attribute={"class"} defaultTheme="dark">
              <Header />
              <Tracker />
              <main className="py-5">{children}</main>
            </ThemeProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
