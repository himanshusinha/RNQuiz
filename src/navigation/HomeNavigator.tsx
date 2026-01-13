import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import CustomHeader from '../components/global/CustomHeader';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import BottomNavigator from './BottomNavigator';
import type { RootStackParamList } from '../types/types';
import QuestionsScreen from '../screens/dashboard/questions/QuestionsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      <Stack.Screen name="Home">
        {({ navigation, route }) => (
          <>
            <CustomHeader
              title={getHeaderTitle(route)}
              navigation={navigation}
              showBack={false}
            />
            <BottomNavigator />
          </>
        )}
      </Stack.Screen>
      <Stack.Screen name="Categories">
        {({ navigation, route }) => {
          const categoryName = route.params?.category?.name ?? '';
          console.log(categoryName);
          return (
            <>
              <CustomHeader
                title={categoryName}
                navigation={navigation}
                showBack
              />
              <CategoriesScreen />
            </>
          );
        }}
      </Stack.Screen>

      <Stack.Screen name="Questions" component={QuestionsScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
