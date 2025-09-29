import { useMemo } from 'react';
import { getColors, getBassoonColors, getThemeColors, ColorScheme, ThemeColors, BassoonColors, ThemeColorSet } from '../config/colors';

/**
 * Custom hook for accessing colors throughout the app
 * Provides easy access to theme-aware colors and Bassoon-specific colors
 */
export const useColors = (colorScheme: ColorScheme = 'dark') => {
    return useMemo(() => {
        const colors: ThemeColors = getColors(colorScheme);
        const bassoonColors: BassoonColors = getBassoonColors();
        const themeColors: ThemeColorSet = getThemeColors(colorScheme);

        return {
            // Full color objects
            colors,
            bassoonColors,
            themeColors,

            // Quick access to commonly used colors
            background: themeColors.background,
            text: themeColors.text,
            border: themeColors.border,
            accent: themeColors.accent,
            success: themeColors.success,
            error: themeColors.error,
            warning: themeColors.warning,
            info: themeColors.info,

            // Bassoon-specific colors
            bassoonRed: bassoonColors.red,
            bassoonLightGreen: bassoonColors.lightGreen,
            bassoonBorder: bassoonColors.border,
        };
    }, [colorScheme]);
};

/**
 * Hook specifically for Bassoon Channel colors
 * Returns only the Bassoon-specific color palette
 */
export const useBassoonColors = (): BassoonColors => {
    return useMemo(() => getBassoonColors(), []);
};

/**
 * Hook for theme-aware colors
 * Returns colors that change based on the current theme
 */
export const useThemeColors = (colorScheme: ColorScheme = 'dark'): ThemeColorSet => {
    return useMemo(() => getThemeColors(colorScheme), [colorScheme]);
};
