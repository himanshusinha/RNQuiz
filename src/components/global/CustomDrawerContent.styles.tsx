import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  profileContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  item: {
    borderRadius: 8,
    marginHorizontal: 10,
  },
  focusedItem: {
    backgroundColor: Colors.blue,
  },
  label: {
    color: Colors.black,
    fontWeight: '400',
  },
  focusedLabel: {
    color: Colors.white,
    fontWeight: '600',
  },
});
export default styles;
