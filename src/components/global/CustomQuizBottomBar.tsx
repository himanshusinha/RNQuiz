import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CustomQuizBottomBarProps } from '../../types/types';

const CustomQuizBottomBar: React.FC<CustomQuizBottomBarProps> = ({
  isFirst,
  isLast,
  onPrev,
  onNext,
  onClear,
  onMark,
}) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity disabled={isFirst} onPress={onPrev}>
        <Text style={[styles.navText, isFirst && styles.disabled]}>Prev</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} onPress={onClear}>
        <Text style={styles.actionText}>CLEAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} onPress={onMark}>
        <Text style={styles.actionText}>MARK</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={isLast} onPress={onNext}>
        <Text style={[styles.navText, isLast && styles.disabled]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.white,
    backgroundColor: Colors.navyBlue,
  },

  navText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.blue,
  },

  disabled: {
    color: Colors.lightGray,
  },

  actionBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: Colors.white,
  },

  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.blue,
  },
});

export default CustomQuizBottomBar;
