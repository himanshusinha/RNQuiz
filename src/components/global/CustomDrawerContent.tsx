import React, { useEffect, useState } from 'react';
import { View, Image, Alert } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import styles from './CustomDrawerContent.styles';
import { Colors } from '../../constants/Colors';
import CustomText from '../../components/global/CustomText'; // 👈 agar use kar rahe ho
import firestore from '@react-native-firebase/firestore';
import UserIcon from '../../assets/icons/user.png';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { navigation, state } = props;
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const currentRoute = state.routeNames[state.index];

  useEffect(() => {
    const loadUser = async () => {
      const user = auth().currentUser;
      if (!user) return;

      setUserEmail(user.email || '');
      setPhotoURL(user.photoURL);
      setUserId(user.uid);
      if (user.displayName) {
        setUserName(user.displayName);
      } else {
        try {
          const doc = await firestore().collection('users').doc(user.uid).get();

          if (doc.exists()) {
            const data = doc.data();
            setUserName(data?.fullName || 'User');
          } else {
            setUserName('User');
          }
        } catch (error) {
          console.log('Firestore user fetch error:', error);
          setUserName('User');
        }
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
              await auth().signOut();
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
              source={
                photoURL
                  ? { uri: photoURL } // remote image
                  : UserIcon // local image imported
              }
              style={styles.profileImage}
            />

            {/* 👇 Name & Email */}
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
          {renderDrawerItem('My Account', 'MyAccount', 'person')}
          {renderDrawerItem('Rules', 'Rules', 'rule')}
        </View>
      </DrawerContentScrollView>

      {/* 🚪 Logout */}
      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          onPress={onLogout}
          icon={({ size }) => (
            <Icon name="logout" size={size} color={Colors.error} />
          )}
          labelStyle={{ color: Colors.error }}
        />
      </View>
    </View>
  );
};

export default CustomDrawerContent;
