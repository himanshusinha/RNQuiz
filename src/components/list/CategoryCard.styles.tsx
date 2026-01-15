import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';

export default StyleSheet.create({
  card: {
    width: '40%',
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 55,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    ...(Platform.OS === 'ios' && {
      backgroundColor: Colors.white,
    }),
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  count: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.gray,
  },
  noTest: {
    marginTop: 8,
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
