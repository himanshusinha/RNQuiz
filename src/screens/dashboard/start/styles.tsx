import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },

  header: {
    height: 150,
    backgroundColor: Colors.darkBlue,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
  },

  card: {
    marginBottom: 60,
    marginHorizontal: 20,
    backgroundColor: '#FAF9F6',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  testTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  startButton: {
    backgroundColor: Colors.darkBlue,
    marginBottom: 40,
    marginHorizontal: 10,
  },
});

export default styles;
