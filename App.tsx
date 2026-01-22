import React, { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
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
    const app = getApp();
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          setIdToken(token);
          console.log('Firebase ID Token:', token);
        } catch (error) {
          console.log('Token fetch error:', error);
        }
      } else {
        setIdToken(null);
      }

      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return <CustomLoader visible={true} />;
  }

  return (
    <NavigationContainer theme={BlueTheme} ref={navigationRef}>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
