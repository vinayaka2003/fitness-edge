import React from 'react';
import type { Metadata } from 'next';
import { DynamicClientLayout } from '../components/layout/DynamicClientLayout';
import '../index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://fitedge.fit'),
  title: "Fitness Edge Prime - Yelahanka Bangalore's Premier Fitness Hub",
  description: "Get fit anytime with top-notch equipment and expert trainers. Your fitness journey starts now!",
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Fitness Edge Prime - Yelahanka Bangalore's Premier Fitness Hub",
    description: "Get fit anytime with top-notch equipment and expert trainers.",
    url: 'https://fitedge.fit',
    siteName: 'Fitness Edge Prime',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[#09090b] text-[#e5e5e8] selection:bg-neutral-200 selection:text-black flex flex-col font-sans">
        <DynamicClientLayout>
          {children}
        </DynamicClientLayout>
      </body>
    </html>
  );
}
