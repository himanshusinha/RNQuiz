import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Colors } from '../../../constants/Colors';

const ScoreScreen = ({ route, navigation }: any) => {
  const { score, totalQuestions, correct, wrong, unAttempted, timeTaken } =
    route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Result</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Score Card */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>Your Score is :</Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      {/* Time & Total */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Time Taken</Text>
          <Text style={styles.infoValue}>{timeTaken}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Total Questions</Text>
          <Text style={styles.infoValue}>{totalQuestions}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Icon name="checkmark-circle" size={22} color="#4CAF50" />
          <Text style={styles.statLabel}>Correct</Text>
          <Text style={[styles.statValue, { color: Colors.green }]}>
            {correct}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Icon name="close-circle" size={22} color={Colors.error} />
          <Text style={styles.statLabel}>Wrong</Text>
          <Text style={[styles.statValue, { color: Colors.error }]}>
            {wrong}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Icon name="help-circle" size={22} color={Colors.orange} />
          <Text style={styles.statLabel}>Un-Attempted</Text>
          <Text style={[styles.statValue, { color: Colors.orange }]}>
            {unAttempted}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.bottomBtns}>
        <TouchableOpacity style={styles.retryBtn}>
          <Text style={styles.retryText}>RE-ATTEMPT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.answerBtn}>
          <Text style={styles.answerText}>VIEW ANSWERS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScoreScreen;
