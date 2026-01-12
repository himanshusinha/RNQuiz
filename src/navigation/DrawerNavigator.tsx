import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BookMarkScreen, HomeScreen, MyAccountScreen } from '../screens';
import RulesScreen from '../screens/rules/RulesScreen';
import CustomDrawerContent from '../components/global/CustomDrawerContent';
import HomeNavigator from './HomeNavigator';
import { DrawerParamList } from '../types/types';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="BookMark" component={BookMarkScreen} />
      <Drawer.Screen name="MyAccount" component={MyAccountScreen} />
      <Drawer.Screen name="Rules" component={RulesScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
