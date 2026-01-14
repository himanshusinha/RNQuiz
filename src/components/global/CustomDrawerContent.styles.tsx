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
    marginBottom: 20,
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
    backgroundColor: Colors.darkBlue,
  },
  label: {
    color: Colors.black,
    fontWeight: '400',
  },
  focusedLabel: {
    color: Colors.white,
    fontWeight: '600',
  },
  logoutContainer: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.gray,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  userName: {
    marginTop: 8,
    fontWeight: '600',
    color: Colors.black,
  },

  userEmail: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.gray,
  },
});
export default styles;
