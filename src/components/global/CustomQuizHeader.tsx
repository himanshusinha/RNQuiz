import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { QuizTopHeaderProps } from '../../types/types';
import { Colors } from '../../constants/Colors';

const QuizTopHeader: React.FC<QuizTopHeaderProps> = ({
  current,
  total,
  time,
  onBack,
  onSubmit,
  timerRunning,
}) => {
  return (
    <View style={styles.topHeader}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Icon name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.count}>
          {current}/{total}
        </Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={timerRunning ? styles.timerStart : styles.timer}>
          {time} min
        </Text>
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitText}>SUBMIT</Text>
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
    padding: 10,
    borderRadius: 20,
  },
  timer: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  timerStart: {
    color: Colors.blue,
    fontSize: 14,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: Colors.yellow,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },

  submitText: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '700',
  },
});
export default QuizTopHeader;
