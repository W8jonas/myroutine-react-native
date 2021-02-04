import * as React from 'react';
import { StatusBar } from 'react-native';
import { Block } from './src/elements';
import AppContainer from './src/routes';
import { AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from './src/context/themeContext';

export default function App() {
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <Block>
          <StatusBar barStyle="light-content" />
          <AppContainer />
        </Block>
      </ThemeProvider>
    </AppearanceProvider>
  );
}