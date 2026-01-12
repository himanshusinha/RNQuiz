import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CustomHeader from '../components/global/CustomHeader';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();

const getHeaderTitle = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Account':
      return 'My Account';
    default:
      return 'Home';
  }
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs Screen */}
      <Stack.Screen name="HomeTabs">
        {({ navigation, route }) => (
          <>
            <CustomHeader
              title={getHeaderTitle(route)} // ✅ dynamic title
              navigation={navigation}
              showBack={false}
            />
            <BottomNavigator />
          </>
        )}
      </Stack.Screen>

      {/* Categories Screen */}
      <Stack.Screen name="Categories">
        {({ navigation, route }) => (
          <>
            <CustomHeader
              title={route.name} // ✅ Categories
              navigation={navigation}
              showBack
            />
            <CategoriesScreen />
          </>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
