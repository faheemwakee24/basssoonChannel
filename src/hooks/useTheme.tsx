import React, { createContext, useContext, useMemo } from 'react';
import { Appearance, ColorSchemeName, StatusBar } from 'react-native';
import { createTheme, Theme, ColorScheme } from '../config/theme';

type ThemeContextValue = {
    theme: Theme;
};

const defaultTheme = createTheme('light');

const ThemeContext = createContext<ThemeContextValue>({
    theme: defaultTheme,
});

type ThemeProviderProps = {
    children: React.ReactNode;
    initialColorScheme?: ColorSchemeName;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    initialColorScheme,
}) => {
    const systemScheme = Appearance.getColorScheme();
    const resolvedScheme: ColorScheme =
        (initialColorScheme || systemScheme) === 'dark' ? 'dark' : 'light';

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme: createTheme(resolvedScheme),
        }),
        [resolvedScheme],
    );

    return (
        <ThemeContext.Provider value={value}>
            <StatusBar
                barStyle={resolvedScheme === 'dark' ? 'light-content' : 'dark-content'}
            />
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
