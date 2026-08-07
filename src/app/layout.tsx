import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AppProvider } from '@/context/AppContext';
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://bsquare.co.in'),
  title: {
    default: 'BSquare Solutions & Services | Premier Technology Training Institute',
    template: '%s | BSquare Solutions',
  },
  description: 'Master Salesforce, Power BI, Tableau, Data Analytics, and AI through expert-led practical training and certification preparation in Hyderabad.',
  keywords: ['IT Training Institute', 'Salesforce Training', 'Power BI Course', 'Data Analytics', 'Tableau Certification', 'Ameerpet IT Training', 'Hyderabad IT courses'],
  authors: [{ name: 'BSquare Solutions & Services' }],
  creator: 'BSquare Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bsquare.co.in',
    title: 'BSquare Solutions & Services | Premier Technology Training Institute',
    description: 'Transform your career with 100% practical IT training in Salesforce, Power BI, and AI. Global certification prep & placement support.',
    siteName: 'BSquare Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BSquare Solutions & Services',
    description: 'Transform your career with 100% practical IT training in Salesforce, Power BI, and AI.',
  },
  alternates: {
    canonical: 'https://bsquare.co.in',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 antialiased selection:bg-[#0086F8] selection:text-white transition-colors duration-200" suppressHydrationWarning>
        <ThemeProvider>
          <AppProvider>
            <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
