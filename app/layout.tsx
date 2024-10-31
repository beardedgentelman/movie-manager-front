import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Main } from '@/components/Main';
import { Footer } from '@/components/Footer';

const montserrat = Montserrat();

export const metadata: Metadata = {
  title: 'Movie Manager App',
  description: 'Movie manager app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} relative flex flex-col min-h-screen h-full bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
