import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BookMarkScreen } from '../screens';
import RulesScreen from '../screens/rules/RulesScreen';
import CustomDrawerContent from '../components/global/CustomDrawerContent';
import HomeNavigator from './HomeNavigator';
import { DrawerParamList } from '../types/types';
import { DefaultTheme } from '@react-navigation/native';
import { Colors } from '../constants/Colors';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
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
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="BookMark" component={BookMarkScreen} />
      <Drawer.Screen name="Rules" component={RulesScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
