// App.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import AuthNavigator from './src/navigation/AuthNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { navigationRef } from './src/utils/NavigationUtil';
import { Colors } from './src/constants/Colors';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const BlueTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.blue, // 🔵 Main blue color
      background: Colors.blue,
      card: Colors.white,
      text: Colors.black,
    },
  };
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          setIdToken(token);
          console.log('✅ Firebase ID Token:', token);
        } catch (err) {
          console.error('❌ Error fetching ID token:', err);
        }
      } else {
        setIdToken(null);
      }

      setInitializing(false);
    });

    return unsubscribe;
  }, []); // ✅ EMPTY dependency

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={BlueTheme} ref={navigationRef}>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
