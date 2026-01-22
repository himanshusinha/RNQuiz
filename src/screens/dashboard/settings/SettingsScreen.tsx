import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { navigate } from '../../../utils/NavigationUtil';
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { Colors } from '../../../constants/Colors';
import { menuItems } from '../../../constants/Data';

const SettingsScreen = () => {
  const handleMenuPress = (screen: string) => {
    switch (screen) {
      case 'BookMark':
        navigate('BookMark');
        break;
      case 'Profile':
        navigate('Profile');
        break;
      case 'Logout':
        onLogout();
        break;
      default:
        console.warn('Screen not found!');
        break;
    }
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Profile Card */}

        {/* Menu */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              danger={item.danger}
              onPress={() => handleMenuPress(item.screen)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem = ({
  icon,
  title,
  danger,
  onPress,
}: {
  icon: string;
  title: string;
  danger?: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Icon
          name={icon}
          size={22}
          color={danger ? Colors.error : Colors.darkBlue}
        />
        <Text style={[styles.menuText, danger && { color: Colors.error }]}>
          {title}
        </Text>
      </View>
      <Icon name="chevron-forward" size={20} color={Colors.white} />
    </TouchableOpacity>
  );
};

export default SettingsScreen;
