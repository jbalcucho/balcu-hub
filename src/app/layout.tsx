import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import LoginButton from "@/components/LoginButton";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Balcu Hub",
  description:
    "Portal de proyectos y publicaciones del ecosistema Balcu Apps.",
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
        <AuthProvider>
          <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#0b0d12]/85 backdrop-blur-md">
            <div className="container-app flex items-center justify-between gap-4 py-4">
              <Link href="/" className="flex min-w-0 items-center gap-3">
                <Image
                  src="/brand/balcu-hub-mark.svg"
                  alt=""
                  width={36}
                  height={36}
                  priority
                  aria-hidden
                />
                <div>
                  <p className="hero-title text-lg font-semibold tracking-tight">
                    Balcu Hub
                  </p>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    balcu apps
                  </p>
                </div>
              </Link>
              <LoginButton />
            </div>
          </header>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
