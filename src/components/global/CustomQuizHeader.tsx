import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { QuizTopHeaderProps } from '../../types/types';
import { Colors } from '../../constants/Colors';

const QuizTopHeader: React.FC<QuizTopHeaderProps> = ({
  current,
  total,
  time, // ✅ string like "24:55" OR "PAUSED"
  onBack,
  onSubmit,
  timerRunning,
  isPaused,
}) => {
  return (
    <View style={styles.topHeader}>
      {/* LEFT */}
      <View style={styles.left}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Icon name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.count}>
          {current}/{total}
        </Text>
      </View>

      {/* TIMER */}
      <View style={styles.timerContainer}>
        <Text
          style={
            isPaused
              ? styles.timerPaused
              : timerRunning
              ? styles.timerStart
              : styles.timer
          }
        >
          {time}
        </Text>
      </View>

      {/* SUBMIT */}
      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.darkBlue,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  count: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  timerContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    minWidth: 70,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timer: {
    color: Colors.orange,
    fontSize: 12,
    fontWeight: '600',
  },

  timerStart: {
    color: Colors.blue,
    fontSize: 12,
    fontWeight: '600',
  },

  timerPaused: {
    color: Colors.orange,
    fontSize: 12,
    fontWeight: '700',
  },

  submitBtn: {
    backgroundColor: Colors.yellow,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});

export default QuizTopHeader;
