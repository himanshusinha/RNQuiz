import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CustomLineProgressBarProps = {
  progress: number; // 0 - 100
};

const CustomLineProgressBar: React.FC<CustomLineProgressBarProps> = ({
  progress,
}) => {
  // ✅ clamp progress safely
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.progressWrapper}>
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${safeProgress}%` }]} />
      </View>

      <Text style={styles.percent}>{safeProgress} %</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressWrapper: {
    alignItems: 'center',
    width: '100%',
  },

  progressBg: {
    width: '80%', // Center thin line
    height: 3, // Thin bar
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#2979FF',
  },

  percent: {
    marginTop: 6,
    fontSize: 12,
    color: '#777',
    fontWeight: '500',
  },
});

export default CustomLineProgressBar;
