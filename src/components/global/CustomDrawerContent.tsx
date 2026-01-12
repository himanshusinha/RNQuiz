import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './CustomDrawerContent.styles';
import { Colors } from '../../constants/Colors';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { navigation, state } = props;

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

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.innerContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150' }}
            style={styles.profileImage}
          />
        </View>

        {renderDrawerItem('Home', 'Home', 'home')}
        {renderDrawerItem('Bookmark', 'BookMark', 'bookmark')}
        {renderDrawerItem('My Account', 'MyAccount', 'person')}
        {renderDrawerItem('Rules', 'Rules', 'rule')}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
