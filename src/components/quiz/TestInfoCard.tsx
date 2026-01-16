import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { TestInfoCardProps } from '../../types/types';

const TestInfoCard: React.FC<TestInfoCardProps> = ({
  questionCount,
  testTime,
  bestScore,
}) => {
  return (
    <View>
      <View style={styles.card}>
        <View style={styles.statsRow}>
          {/* Questions */}
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{questionCount}</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>

          {/* Best Score */}
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{bestScore}</Text>
            <Text style={styles.statLabel}>Best Score</Text>
          </View>

          {/* Time */}
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{testTime}</Text>
            <Text style={styles.statLabel}>Time (min)</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TestInfoCard;
