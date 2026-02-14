import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'DevLeão Agency | Tecnologia e Estratégia Digital',
  description: 'Desenvolvimento de sites de alta performance, BI e Marketing Digital em Belo Horizonte. Transforme sua visão em resultados reais.',
  keywords: 'Desenvolvimento Web, Next.js, Marketing Digital BH, Business Intelligence, Criação de Sites, Automação n8n, IA',
  authors: [{ name: 'Leandro Filipe' }],
  creator: 'Leandro Filipe',
  publisher: 'DevLeão Agency',
  
  // Como o link aparece em redes sociais
  openGraph: {
    title: 'DevLeão Agency | Tecnologia de Elite',
    description: 'Transformamos sua visão em alta performance digital. Sites, BI e Estratégia.',
    url: 'https://devleao.com.br', // Substitua pelo seu domínio real
    siteName: 'DevLeão Agency',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/banner-home.png', // Certifique-se que essa imagem existe na /public
        width: 1200,
        height: 630,
        alt: 'DevLeão Agency - Portfolio',
      },
    ],
  },

  // Como o link aparece no Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'DevLeão Agency',
    description: 'Tecnologia para impulsionar seu negócio.',
    images: ['/banner-home.png'],
  },

  // Ícone da aba do navegador
  icons: {
    icon: '/logo.png', // O caminho do seu favicon
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

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
        {/* Envolvendo a aplicação para habilitar o efeito de inércia */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}