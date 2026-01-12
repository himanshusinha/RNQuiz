import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';

const HEADER_HEIGHT = 56;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.blue,
  },

  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.blue,

    // ANDROID
    elevation: 4,

    // iOS shadow
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,

    ...(Platform.OS === 'ios' && {
      borderBottomWidth: 0.5,
      borderBottomColor: '#E5E5E5',
    }),
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },

  sideIcon: {
    width: 24,
    alignItems: 'center',
  },
});

export default styles;
