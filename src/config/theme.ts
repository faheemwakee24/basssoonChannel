import { lightColors, darkColors, ColorScheme } from './colors';

export const createTheme = (colorScheme: ColorScheme = 'light') => {
    const colors = colorScheme === 'dark' ? darkColors : lightColors;

    return {
        colors,
        spacing: {
            xs: 4,
            sm: 8,
            md: 16,
            lg: 24,
            xl: 32,
            xxl: 40,
            xxxl: 48,
        },
        borderRadius: {
            sm: 4,
            md: 8,
            lg: 12,
            xl: 16,
            xxl: 20,
            full: 9999,
        },
        fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20,
            xxl: 24,
            xxxl: 32,
        },
        fontWeight: {
            normal: '400' as const,
            medium: '500' as const,
            semibold: '600' as const,
            bold: '700' as const,
        },
    };
};

export type Theme = ReturnType<typeof createTheme>;
export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');

// Re-export ColorScheme for external use
export type { ColorScheme };
