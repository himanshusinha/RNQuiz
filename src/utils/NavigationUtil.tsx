import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// ---------------- NAVIGATE ----------------
export function navigate<RouteName extends keyof RootStackParamList>(
  ...args: undefined extends RootStackParamList[RouteName]
    ?
        | [routeName: RouteName]
        | [routeName: RouteName, params: RootStackParamList[RouteName]]
    : [routeName: RouteName, params: RootStackParamList[RouteName]]
) {
  if (navigationRef.isReady()) {
    // @ts-expect-error — React Navigation internal overload mismatch
    navigationRef.navigate(...args);
  }
}

// ---------------- RESET ----------------
export function resetAndNavigate<RouteName extends keyof RootStackParamList>(
  routeName: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      }),
    );
  }
}

// ---------------- BACK ----------------
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

// ---------------- PUSH ----------------
export function push<RouteName extends keyof RootStackParamList>(
  routeName: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
}
