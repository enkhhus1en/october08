import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Header } from "@/components/header";
import { Tracker } from "@/components/tracker";
import "./globals.css";

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu-mono",
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
      <body className={`${ubuntuMono.variable} antialiased`}>
        <div className="flex flex-col items-center min-h-screen">
          <div className="w-full max-w-3xl p-5">
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="dark">
                <Header />
                <Tracker />
                <main className="py-10">{children}</main>
              </ThemeProvider>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
