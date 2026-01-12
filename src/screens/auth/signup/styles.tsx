import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.black,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
  },
  gimg: {
    height: 20,
    width: 20,
  },
});
export default styles;
