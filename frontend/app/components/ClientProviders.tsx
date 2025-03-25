'use client';

import { useEffect } from 'react';
import { useMantineColorScheme } from '@mantine/core';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  const { setColorScheme } = useMantineColorScheme();

  // Load color scheme from localStorage on client-side
  useEffect(() => {
    const savedScheme = localStorage.getItem('disco-discord-color-scheme');
    if (savedScheme === 'dark' || savedScheme === 'light') {
      setColorScheme(savedScheme);
    } else {
      // Set default to dark if no preference is saved
      setColorScheme('dark');
    }
  }, [setColorScheme]);

  return <>{children}</>;
} 