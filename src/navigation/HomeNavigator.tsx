import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import CustomHeader from '../components/global/CustomHeader';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={BottomNavigator}
        options={{
          header: ({ navigation }) => (
            <CustomHeader
              title="Home"
              navigation={navigation}
              showBack={false}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          header: ({ navigation, route }) => (
            <CustomHeader title={route.name} navigation={navigation} showBack />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
