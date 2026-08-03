import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AppProvider } from '@/context/AppContext';
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper';

export const metadata: Metadata = {
  title: 'BSquare Solutions & Services | Premier Technology Training Institute',
  description: 'Master Salesforce, Power BI, Tableau, Data Analytics, and AI through expert-led practical training and certification preparation.',
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
