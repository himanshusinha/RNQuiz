import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    justifyContent: 'space-between',
  },

  header: {
    height: 200,
    backgroundColor: '#0A66FF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },

  card: {
    marginTop: -60,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  testTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A66FF',
  },

  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  startBtn: {
    backgroundColor: '#0A66FF',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
  },

  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default styles;
