import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Cabral | Software Engineer & Creative UI/UX Developer",
  description:
    "Portfólio de Lucas Bezerra de Menezes Cabral. Engenheiro de Software Full Stack e UI/UX Developer. Projetos de alto impacto com Next.js, TypeScript, GSAP e Tailwind CSS.",
  keywords: [
    "Lucas Bezerra",
    "Lucas Cabral",
    "Software Engineer",
    "Engenheiro de Software",
    "UI/UX Developer",
    "Front-end Sênior",
    "Creative Developer",
    "Next.js",
    "GSAP",
    "Rio de Janeiro",
  ],
  authors: [{ name: "Lucas Bezerra de Menezes Cabral" }],
  openGraph: {
    title: "Lucas Cabral | Software Engineer & Creative UI/UX Developer",
    description:
      "Engenharia de Software de precisão aliada a design de alta fidelidade e microinterações cinematográficas.",
    locale: "pt_BR",
    type: "website",
  },
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
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

