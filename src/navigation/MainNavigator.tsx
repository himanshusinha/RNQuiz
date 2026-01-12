import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import { BookMarkScreen, MyAccountScreen } from '../screens';
import RulesScreen from '../screens/rules/RulesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = ({ navigation }: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomNavigator}
        options={{
          headerTitle: 'Home',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={26} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="BookMark" component={BookMarkScreen} />
      <Stack.Screen name="MyAccount" component={MyAccountScreen} />
      <Stack.Screen name="Rules" component={RulesScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
