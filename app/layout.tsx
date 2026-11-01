import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/providers/SmoothScroll';
import ScrollProgress from '@/components/ui/ScrollProgress';
import FloatingContact from '@/components/ui/FloatingContact';
import { SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blue Leaf — Plant Nursery & Green Setup Service',
  description: SITE_CONFIG.tagline,
  keywords: [
    'plant nursery Bangalore',
    'green setup service',
    'indoor plants India',
    'office plants',
    'balcony garden setup',
    'buy plants online COD',
  ],
  authors: [{ name: 'Blue Leaf' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAF7] text-ink antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingContact />
        </SmoothScroll>
      </body>
    </html>
  );
}
