import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { navigate } from '../../../utils/NavigationUtil';
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import UserIcon from '../../../assets/icons/user.png';
import { Colors } from '../../../constants/Colors';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [overallScore, setOverallScore] = useState(0);

  // Menu items data
  const menuItems = [
    { icon: 'bookmark-outline', title: 'BookMark', screen: 'BookMark' },
    { icon: 'person-outline', title: 'Profile', screen: 'Profile' },
    {
      icon: 'log-out-outline',
      title: 'Logout',
      screen: 'Logout',
      danger: true,
    },
  ];

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
      <Icon name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
};

export default SettingsScreen;
