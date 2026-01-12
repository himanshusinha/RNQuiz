import React from 'react';
import { View, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import styles from './CustomDrawerContent.styles';
import { Colors } from '../../constants/Colors';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { navigation, state } = props;
  const user = auth().currentUser;

  const currentRoute = state.routeNames[state.index];

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

  const onLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Drawer content */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        <View style={styles.innerContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={
                user?.photoURL
                  ? { uri: user.photoURL }
                  : { uri: 'https://i.pravatar.cc/150' }
              }
              style={styles.profileImage}
            />
          </View>

          {renderDrawerItem('Home', 'Home', 'home')}
          {renderDrawerItem('Bookmark', 'BookMark', 'bookmark')}
          {renderDrawerItem('My Account', 'MyAccount', 'person')}
          {renderDrawerItem('Rules', 'Rules', 'rule')}
        </View>
      </DrawerContentScrollView>

      {/* Logout Button (Bottom) */}
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
