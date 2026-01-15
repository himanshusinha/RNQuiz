import { Platform, StyleSheet } from 'react-native';
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
    backgroundColor: Colors.white,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  /* ✅ Selected option highlight */
  selectedOption: {
    backgroundColor: '#E8F1FF',
    borderColor: Colors.blue,
  },

  /* ✅ Filled radio when selected */
  radioSelected: {
    backgroundColor: Colors.blue,
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
  questionBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  /* 🔴 MARKED Ribbon (Android style) */
  markedRibbon: {
    position: 'absolute',
    top: 10,
    right: 18,
    backgroundColor: Colors.error, // Android orange
    paddingHorizontal: 20,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 8,
    padding: 4,
    zIndex: 10,
  },

  markedText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
export default styles;
