import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.78;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: MODAL_WIDTH,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B2E83',
    marginTop: 80,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginVertical: 6,
  },
  legendDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  grid: {
    paddingBottom: 40,
  },
  circle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#fff',
    fontWeight: '600',
  },
});
export default styles;
