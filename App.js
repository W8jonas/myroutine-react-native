import * as React from 'react';
import { StatusBar } from 'react-native';
import { Block } from './src/elements';
import AppContainer from './src/routes';

export default function App() {
  return (
    <Block>
      <StatusBar barStyle="light-content" />
      <AppContainer />
    </Block>
  );
}