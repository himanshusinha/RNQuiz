import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    padding: 12,
  },

  count: { color: Colors.white, fontWeight: '600' },
  timer: { color: Colors.white, fontWeight: '600' },

  submitBtn: {
    backgroundColor: Colors.orange,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },

  submitText: { fontWeight: '700' },

  subjectBar: {
    backgroundColor: Colors.darkBlue,
    padding: 10,
  },

  subjectText: { color: Colors.white, fontWeight: '600' },
  content: {
    flex: 1,
    padding: 16,
  },

  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    padding: 20,
    backgroundColor: Colors.white,
    borderWidth: 0.3,
    borderColor: Colors.gray,
    borderRadius: 12,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 6,
    borderWidth: 0.3,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
  },

  selectedOption: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
    color: Colors.white,
  },

  radioSelected: {
    backgroundColor: Colors.blue,
  },

  optionText: { fontSize: 14 },

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
    color: Colors.white,
    fontSize: 18,
  },

  actionBtn: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  actionText: {
    color: Colors.white,
    fontSize: 12,
  },
  questionBox: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3, // Android shadow
    shadowColor: Colors.black, // iOS shadow
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
  markedRibbon: {
    position: 'absolute',
    top: 15,
    right: 16,
    backgroundColor: Colors.error, // Android orange
    paddingHorizontal: 20,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    padding: 2,
    zIndex: 10,
  },

  markedText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  questionNoTitle: { color: Colors.white, fontWeight: '600' },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  paletteItem: {
    width: 48,
    height: 48,
    margin: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timeUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
});
export default styles;
