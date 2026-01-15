import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  header: {
    backgroundColor: '#1565C0',
    paddingVertical: 14,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  profileCard: {
    backgroundColor: '#1565C0',
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 20,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },

  name: {
    marginTop: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
    width: '85%',
    paddingVertical: 14,
    justifyContent: 'space-around',
  },

  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },

  divider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },

  menuCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 10,
    paddingVertical: 6,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#000',
  },
});
export default styles;
