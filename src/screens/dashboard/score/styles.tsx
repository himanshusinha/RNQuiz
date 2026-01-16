import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F9',
  },

  header: {
    backgroundColor: Colors.darkBlue,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  scoreCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },

  scoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EDE7F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scoreText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.purple,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },

  infoItem: {
    alignItems: 'center',
  },

  infoLabel: {
    fontSize: 12,
    color: '#777',
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },

  statBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },

  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },

  bottomBtns: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  retryBtn: {
    flex: 1,
    backgroundColor: Colors.purple,
    padding: 14,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },

  retryText: {
    color: '#fff',
    fontWeight: '700',
  },

  answerBtn: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    padding: 14,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },

  answerText: {
    color: '#fff',
    fontWeight: '700',
  },
});
