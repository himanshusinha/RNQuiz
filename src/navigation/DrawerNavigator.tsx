import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BookMarkScreen, MyAccountScreen } from '../screens';
import RulesScreen from '../screens/rules/RulesScreen';
import BottomNavigator from './BottomNavigator';
import CustomHeader from '../components/global/CustomHeader';
import { View } from 'react-native';
import CustomDrawerContent from '../components/global/CustomDrawerContent';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: ({ navigation, route }) => (
          <View style={{ marginTop: 60, backgroundColor: Colors.white }}>
            <CustomHeader
              title={route.name}
              navigation={navigation}
              showBack={route.name !== 'Home'}
            />
          </View>
        ),
      }}
    >
      <Drawer.Screen name="Home" component={BottomNavigator} />
      <Drawer.Screen name="BookMark" component={BookMarkScreen} />
      <Drawer.Screen name="MyAccount" component={MyAccountScreen} />
      <Drawer.Screen name="Rules" component={RulesScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
