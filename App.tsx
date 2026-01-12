import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { Colors } from './src/constants/Colors';
import AuthNavigator from './src/navigation/AuthNavigator';
import { navigationRef } from './src/utils/NavigationUtil';

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.blue,
    primary: Colors.blue,
    card: Colors.white,
    text: Colors.white,
    border: Colors.gray,
    notification: Colors.blue,
  },
};

export default function App() {
  return (
    <NavigationContainer ref={navigationRef} theme={AppTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
