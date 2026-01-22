import React, { useEffect, useState } from 'react';
import { View, Image, Alert } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';

import styles from './CustomDrawerContent.styles';
import { Colors } from '../../constants/Colors';
import CustomText from '../../components/global/CustomText';
import UserIcon from '../../assets/icons/user.png';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { navigation, state } = props;
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const currentRoute = state.routeNames[state.index];

  useEffect(() => {
    const loadUser = async () => {
      try {
        const app = getApp();
        const auth = getAuth(app);
        const db = getFirestore(app);

        const user = auth.currentUser;
        if (!user) return;

        setUserEmail(user.email ?? '');
        setPhotoURL(user.photoURL ?? null);
        setUserId(user.uid);

        if (user.displayName) {
          setUserName(user.displayName);
        } else {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserName(data?.fullName || 'User');
          } else {
            setUserName('User');
          }
        }
      } catch (error) {
        console.log('Drawer user load error:', error);
        setUserName('User');
      }
    };

    loadUser();
  }, []);

  const renderDrawerItem = (
    label: string,
    routeName: string,
    iconName: string,
  ) => {
    const focused = currentRoute === routeName;

    return (
      <DrawerItem
        label={label}
        onPress={() => navigation.navigate(routeName as never)}
        style={[styles.item, focused && styles.focusedItem]}
        labelStyle={[styles.label, focused && styles.focusedLabel]}
        icon={({ size }) => (
          <Icon
            name={iconName}
            size={size}
            color={focused ? Colors.white : Colors.black}
          />
        )}
      />
    );
  };

  const onLogout = () => {
    Alert.alert(
      'Logout',
      'Do you want to logout from app?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              const auth = getAuth(getApp());
              await auth.signOut();
            } catch (error) {
              console.log('Logout error:', error);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        <View style={styles.innerContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={photoURL ? { uri: photoURL } : UserIcon}
              style={styles.profileImage}
            />

            <CustomText variant="h6" style={styles.userName}>
              {userName}
            </CustomText>

            {userEmail ? (
              <CustomText variant="body" style={styles.userEmail}>
                {userEmail}
              </CustomText>
            ) : null}
          </View>

          {renderDrawerItem('Home', 'Home', 'home')}
          {renderDrawerItem('Bookmark', 'BookMark', 'bookmark')}
          {renderDrawerItem('Rules', 'Rules', 'rule')}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;
