import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BookMarkScreen } from '../screens';
import RulesScreen from '../screens/rules/RulesScreen';
import CustomDrawerContent from '../components/global/CustomDrawerContent';
import HomeNavigator from './HomeNavigator';
import { DrawerParamList } from '../types/types';
import { BookmarkProvider } from '../context/BookMarkContext';
import ProfileScreen from '../screens/dashboard/profile/ProfileScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <BookmarkProvider>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={HomeNavigator} />
        <Drawer.Screen name="BookMark" component={BookMarkScreen} />
        <Drawer.Screen name="Rules" component={RulesScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </BookmarkProvider>
  );
};

export default DrawerNavigator;
