import { useEffect } from 'react';
import { useGetSiteTheme } from './useQueries';

// Default fallback theme (black and orange palette)
const DEFAULT_THEME = {
  primaryColor: '#F26522',
  accentColor: '#FFD700',
  backgroundColor: '#181818',
};

/**
 * Fetches the site theme from the backend and injects the colors
 * as CSS custom properties on :root, overriding the static defaults.
 */
export function useThemeLoader() {
  const { data: theme } = useGetSiteTheme();

  useEffect(() => {
    const primary = theme?.primaryColor || DEFAULT_THEME.primaryColor;
    const accent = theme?.accentColor || DEFAULT_THEME.accentColor;
    const bg = theme?.backgroundColor || DEFAULT_THEME.backgroundColor;

    const root = document.documentElement;
    root.style.setProperty('--theme-primary', primary);
    root.style.setProperty('--theme-accent', accent);
    root.style.setProperty('--theme-bg', bg);
  }, [theme]);
}
