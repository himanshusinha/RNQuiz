import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  /* Container */
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  /* FlatList content padding */
  list: {
    padding: 16,
  },

  /* Card for each question */
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3, // shadow for Android
    shadowColor: Colors.black, // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative', // for badge
  },

  /* Question number */
  qNo: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkBlue,
    marginBottom: 6,
  },

  /* Question text */
  question: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 12,
    borderWidth: 0.3,
    borderColor: Colors.gray,
    padding: 20,
  },

  /* Option container */
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 6,
    borderWidth: 0.3,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
  },

  /* Option text */
  optionText: {
    fontSize: 14,
    color: Colors.black,
  },

  /* Correct option */
  correctOption: {
    backgroundColor: Colors.white,
    borderColor: Colors.green,
  },
  correctText: {
    color: Colors.green,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },

  /* Wrong option */
  wrongOption: {
    backgroundColor: Colors.white,
    borderColor: Colors.error,
  },
  wrongText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },

  /* Unattempted option */
  unattemptedText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.orange,
  },

  /* Marked Badge */
  markedBadge: {
    position: 'absolute',
    right: 12,
    backgroundColor: Colors.error,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  markedText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default styles;
