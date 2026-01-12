import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },

  card: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
});
export default styles;
