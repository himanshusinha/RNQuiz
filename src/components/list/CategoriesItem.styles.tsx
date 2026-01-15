import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,

    // Android shadow
    elevation: 6,

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  disabledCard: {
    opacity: 0.5,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.black,
  },

  countText: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 6,
  },

  noTestText: {
    color: Colors.black,
  },

  lockIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
export default styles;
