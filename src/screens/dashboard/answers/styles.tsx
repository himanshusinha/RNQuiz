import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  /* EXISTING */
  container: {
    flex: 1,
    backgroundColor: '#F2F5F9',
  },
  list: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },

  card: {
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },

  qNo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3F51B5',
    marginBottom: 4,
  },

  question: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 10,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },

  optionText: {
    fontSize: 14,
    color: Colors.black,
  },

  /* ✅ CORRECT OPTION */
  correctOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },

  correctText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },

  /* ❌ WRONG OPTION */
  wrongOption: {
    backgroundColor: '#FDECEA',
    borderColor: '#F44336',
  },

  wrongText: {
    color: '#C62828',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },

  /* ⚪ UNATTEMPTED */
  unattemptedText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#FF9800',
  },
  markedBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#FF5722',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  markedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default styles;
