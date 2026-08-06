'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}

export function useCustomTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? resolvedTheme : theme;
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return { 
    theme: mounted ? (theme === 'system' ? resolvedTheme : theme) : 'light',
    setTheme, 
    toggleTheme, 
    mounted 
  };
}
