import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Certifique-se que o componente SmoothScroll existe mesmo em app/components/SmoothScroll.tsx
// Se não existir, remova a importação e o uso dele abaixo.
import SmoothScroll from "./components/SmoothScroll"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'DevLeão Agency | Tecnologia e Estratégia Digital',
  description: 'Desenvolvimento de sites de alta performance, BI e Marketing Digital em Belo Horizonte. Transforme sua visão em resultados reais.',
  keywords: 'Desenvolvimento Web, Next.js, Marketing Digital BH, Business Intelligence, Criação de Sites, Automação n8n, IA',
  authors: [{ name: 'Leandro Filipe' }],
  creator: 'Leandro Filipe',
  publisher: 'DevLeão Agency',
  
  openGraph: {
    title: 'DevLeão Agency | Tecnologia de Elite',
    description: 'Transformamos sua visão em alta performance digital. Sites, BI e Estratégia.',
    url: 'https://devleao.com.br',
    siteName: 'DevLeão Agency',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/banner-home.png',
        width: 1200,
        height: 630,
        alt: 'DevLeão Agency - Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DevLeão Agency',
    description: 'Tecnologia para impulsionar seu negócio.',
    images: ['/banner-home.png'],
  },

  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}; // <--- O ERRO ESTAVA AQUI (Faltava fechar o objeto metadata)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}