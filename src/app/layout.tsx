import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tralala Daily Quest",
  description: "Mini app daily check-in + quest + point keur Farcaster.",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/daily", label: "Daily" },
  { href: "/quests", label: "Quest" },
  { href: "/ranking", label: "Ranking" },
  { href: "/points", label: "Point" },
  { href: "/convert", label: "Convert" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0b1020] text-white">
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-4">
          <header className="mb-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
                  Farcaster Mini App
                </p>
                <h1 className="text-xl font-bold">Tralala Daily Quest</h1>
              </div>
              <div className="rounded-2xl bg-cyan-400/15 px-3 py-1 text-xs font-medium text-cyan-200">
                MVP Gratis
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <nav className="sticky bottom-0 mt-4 grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-[#11182d]/90 p-2 backdrop-blur">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-2 text-center text-sm text-zinc-200 transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </body>
    </html>
  );
}
