/**
 * Bassoon Channel - Digital Wallet App
 * 
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from './src/hooks/useTheme';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Header } from './src/components/Header';
import { Toast } from './src/components/Toast';
import { darkColors, store } from './src';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: darkColors.background }}>
        <ThemeProvider initialColorScheme={isDarkMode ? 'dark' : 'light'}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          <Header />
          <AppNavigator />
          <Toast />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
