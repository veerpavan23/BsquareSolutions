import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/modals/SearchModal';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import { BrochureModal } from '@/components/modals/BrochureModal';
import { CourseCompareModal } from '@/components/modals/CourseCompareModal';
import { WishlistDrawer } from '@/components/drawers/WishlistDrawer';

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
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <SearchModal />
            <BookDemoModal />
            <BrochureModal />
            <CourseCompareModal />
            <WishlistDrawer />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
