import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeScreen, MyAccountScreen } from '../screens';
import { Colors } from '../constants/Colors';
import { BottomTabParamList } from '../types/types';
import SettingsScreen from '../screens/dashboard/settings/SettingsScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.darkBlue,
        tabBarInactiveTintColor: Colors.gray,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName =
            route.name === 'Home'
              ? focused
                ? 'home'
                : 'home-outline'
              : focused
              ? 'settings'
              : 'settings-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
