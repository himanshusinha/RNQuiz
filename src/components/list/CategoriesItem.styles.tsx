import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 10,
  },
  percentage: {
    alignSelf: 'flex-end',
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
});
export default styles;
