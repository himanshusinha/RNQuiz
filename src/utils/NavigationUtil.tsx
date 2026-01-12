import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// ---------------- NAVIGATE ----------------
export function navigate(routeName: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(routeName);
  }
}

// ---------------- RESET ----------------
export function resetAndNavigate(routeName: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
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
export function push(routeName: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName));
  }
}
