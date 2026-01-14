// App.tsx
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import AuthNavigator from './src/navigation/AuthNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { navigationRef } from './src/utils/NavigationUtil';
import { Colors } from './src/constants/Colors';
import CustomLoader from './src/components/global/CustomLoader';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  const BlueTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.white,
      background: Colors.white,
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
          console.log('Firebase ID Token:', token);
        } catch (err) {
          console.error('Error fetching ID token:', err);
        }
      } else {
        setIdToken(null);
      }

      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  /* 🔥 ONLY CUSTOM LOADER */
  if (initializing) {
    return <CustomLoader visible={true} />;
  }

  return (
    <NavigationContainer theme={BlueTheme} ref={navigationRef}>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
