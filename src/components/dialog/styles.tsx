import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dialog: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },

  message: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },

  cancelText: {
    color: Colors.blue,
    fontSize: 14,
    fontWeight: '600',
  },

  confirmBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  confirmText: {
    color: Colors.blue,
    fontSize: 14,
    fontWeight: '700',
  },
});
export default styles;
