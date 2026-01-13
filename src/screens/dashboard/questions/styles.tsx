import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F9',
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    padding: 12,
  },

  count: { color: '#fff', fontWeight: '600' },
  timer: { color: '#fff', fontWeight: '600' },

  submitBtn: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },

  submitText: { fontWeight: '700' },

  subjectBar: {
    backgroundColor: '#0A2E8A',
    padding: 10,
  },

  subjectText: { color: '#fff', fontWeight: '600' },

  /* 🔑 THIS IS THE KEY */
  content: {
    flex: 1, // 👈 pushes bottom bar down
    padding: 16,
  },

  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    padding: 20,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.blue,
    marginRight: 12,
  },

  optionText: { fontSize: 14 },

  /* 🔻 Fixed Bottom Bar */
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.blue,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 0,
  },

  navText: {
    color: '#fff',
    fontSize: 18,
  },

  actionBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  actionText: {
    color: '#fff',
    fontSize: 12,
  },
});
export default styles;
