import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { CircuitScrollLine } from "@/components/ui/CircuitScrollLine";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import { Preloader } from "@/components/ui/Preloader";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { LanguageProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lucas-cabral.vercel.app"),
  title: {
    default: "Lucas Cabral | Software Engineer & Creative UI/UX Developer",
    template: "%s | Lucas Cabral",
  },
  description:
    "Portfólio de Lucas Bezerra de Menezes Cabral. Engenheiro de Software Full Stack e UI/UX Developer no Rio de Janeiro. Arquitetura reativa a 60 FPS, Next.js 16, TypeScript, GSAP e Automação Industrial.",
  keywords: [
    "Lucas Bezerra",
    "Lucas Cabral",
    "Engenheiro de Software",
    "Software Engineer",
    "UI/UX Developer",
    "Front-end Sênior",
    "Creative Developer",
    "Next.js 16",
    "GSAP",
    "Tailwind CSS",
    "Node.js",
    "Automação Industrial",
    "Firjan SENAI",
    "Rio de Janeiro",
  ],
  authors: [{ name: "Lucas Bezerra de Menezes Cabral", url: "https://github.com/Lucvs1" }],
  creator: "Lucas Cabral",
  publisher: "Lucas Cabral",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Lucas Cabral | Software Engineer & Creative UI/UX Developer",
    description:
      "Engenharia de Software de alta fidelidade aliada a design fluido e sistemas tolerantes a falhas.",
    url: "/",
    siteName: "Lucas Cabral Portfolio",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Cabral | Software Engineer & Creative UI/UX Developer",
    description:
      "Engenharia de Software de alta fidelidade aliada a design fluido e sistemas tolerantes a falhas.",
    creator: "@Lucvs1",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-white">
        <JsonLd />
        <SmoothScrollProvider>
          <LanguageProvider>
            <Preloader />
            <InteractiveBackground />
            <CircuitScrollLine />
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
            <SoundToggle />
            <CommandPalette />
            <ResumeModal />
            <CaseStudyModal />
            <CustomCursor />
          </LanguageProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

