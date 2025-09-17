/**
 * Auth Theme Types and Constants
 * Purpose: Define theme system for Login vs Registration pages
 * Philosophy: Preserve unique visual identities while enabling component reuse
 */

export type AuthTheme = 'login' | 'registration';

export interface AuthThemeConfig {
  // Background gradients
  backgroundGradient: string;
  
  // Primary colors
  primaryColor: string;
  primaryHover: string;
  primaryLight: string;
  
  // Accent colors for elements
  accentColor: string;
  accentLight: string;
  
  // Animated background elements
  decorativeElements: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  
  // Focus colors
  focusRing: string;
  focusBorder: string;
}

export const AUTH_THEMES: Record<AuthTheme, AuthThemeConfig> = {
  login: {
    // Cool blue/sky theme
    backgroundGradient: 'from-sky-50 via-white to-blue-50',
    primaryColor: 'from-sky-500 to-blue-600',
    primaryHover: 'from-sky-600 to-blue-700',
    primaryLight: 'from-sky-400 to-blue-500',
    accentColor: 'sky-500',
    accentLight: 'sky-100',
    decorativeElements: {
      primary: 'from-sky-200/30 to-blue-300/30',
      secondary: 'from-blue-200/20 to-purple-300/20',
      tertiary: 'from-purple-200/10 to-sky-300/10',
    },
    focusRing: 'focus:ring-sky-100',
    focusBorder: 'focus:border-sky-500',
  },
  registration: {
    // Warm orange/red theme
    backgroundGradient: 'from-orange-50 via-white to-red-50',
    primaryColor: 'from-orange-500 to-red-600',
    primaryHover: 'from-orange-600 to-red-700',
    primaryLight: 'from-orange-400 to-red-500',
    accentColor: 'orange-500',
    accentLight: 'orange-100',
    decorativeElements: {
      primary: 'from-orange-200/30 to-red-300/30',
      secondary: 'from-purple-200/20 to-pink-300/20',
      tertiary: 'from-yellow-200/10 to-orange-300/10',
    },
    focusRing: 'focus:ring-orange-100',
    focusBorder: 'focus:border-orange-500',
  },
};

export const getThemeClasses = (theme: AuthTheme) => AUTH_THEMES[theme];