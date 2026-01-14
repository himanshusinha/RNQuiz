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

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.darkBlue,
  },

  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  /* 🔥 FIXED START BUTTON */
  startBtn: {
    backgroundColor: Colors.darkBlue, // ✅ REQUIRED
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24, // ✅ instead of bottom
  },

  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
