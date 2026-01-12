import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../components/global/CustomHeader';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs">
        {({ navigation }) => (
          <>
            <CustomHeader
              title="Home"
              navigation={navigation}
              showBack={false}
            />
            <BottomNavigator />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="Categories">
        {({ navigation, route }) => (
          <>
            <CustomHeader title={route.name} navigation={navigation} showBack />
            <CategoriesScreen />
          </>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
