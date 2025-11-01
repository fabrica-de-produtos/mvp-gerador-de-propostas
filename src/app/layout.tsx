import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/presentation/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gerador de Propostas | Sistema de Gestão Comercial",
    template: "%s | Gerador de Propostas",
  },
  description: "Sistema completo de geração e gerenciamento de propostas comerciais em tempo real. Crie, visualize e organize suas propostas de forma rápida e eficiente.",
  
  // Application Name
  applicationName: "Gerador de Propostas",
  
  // Open Graph Protocol (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Gerador de Propostas | Sistema de Gestão Comercial",
    description: "Sistema completo de geração e gerenciamento de propostas comerciais em tempo real. Crie, visualize e organize suas propostas de forma rápida e eficiente.",
    url: "https://mvp-gerador-de-propostas.vercel.app",
    siteName: "Gerador de Propostas",
    images: [
      {
        url: "https://slfgrqlavepinggbirfj.supabase.co/storage/v1/object/public/bucket-nanobanan-VEO3/imagens/output.jpeg1761957198282",
        width: 1200,
        height: 630,
        alt: "Gerador de Propostas - Sistema completo de gestão comercial com interface moderna e intuitiva",
        type: "image/jpeg",
      },
    ],
    locale: "pt_BR",
    type: "website",
    countryName: "Brazil",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Gerador de Propostas | Sistema de Gestão Comercial",
    description: "Sistema completo de geração e gerenciamento de propostas comerciais em tempo real. Crie, visualize e organize suas propostas de forma rápida e eficiente.",
    images: {
      url: "https://slfgrqlavepinggbirfj.supabase.co/storage/v1/object/public/bucket-nanobanan-VEO3/imagens/output.jpeg1761957198282",
      alt: "Gerador de Propostas - Sistema de gestão comercial",
    },
    creator: "@seu_twitter",
    site: "@seu_twitter",
  },

  // Additional metadata
  keywords: [
    "gerador de propostas",
    "propostas comerciais",
    "gestão comercial",
    "sistema de propostas",
    "saas",
    "crm",
    "vendas",
    "automação comercial",
    "propostas online",
    "gestão de vendas",
  ],
  authors: [{ name: "Gerador de Propostas" }],
  creator: "Gerador de Propostas",
  publisher: "Gerador de Propostas",
  
  // Category
  category: "business",
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternates
  alternates: {
    canonical: "https://mvp-gerador-de-propostas.vercel.app",
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0B1220",
      },
    ],
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Other
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Propostas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#0B1220" />
        <meta name="msapplication-TileColor" content="#0B1220" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
