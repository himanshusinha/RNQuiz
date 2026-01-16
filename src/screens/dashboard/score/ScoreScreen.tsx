import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Colors } from '../../../constants/Colors';
import CustomHeader from '../../../components/global/CustomHeader';

const ScoreScreen = ({ route, navigation }: any) => {
  const {
    score,
    totalQuestions,
    correct,
    wrong,
    unAttempted,
    timeTaken,
    marked,
    questions,
  } = route.params;
  console.log(score);
  const answersScreen = () => {
    if (!questions || questions.length === 0) return;

    navigation.navigate('Answers', {
      questions,
      categoryName: route.params.categoryName,
    });
  };
  const reattemptQuiz = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Start',
          params: {
            categoryId: route.params.categoryId,
            categoryName: route.params.categoryName,
            testNumber: route.params.testNumber,
            lastScore: score, // ✅ score bhej rahe hain
          },
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader title={'Results'} navigation={navigation} showBack={true} />

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
        <View style={styles.statBox}>
          <Icon name="help-circle" size={22} color={Colors.orange} />
          <Text style={styles.statLabel}>Marked</Text>
          <Text style={[styles.statValue, { color: Colors.error }]}>
            {marked}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.bottomBtns}>
        <TouchableOpacity onPress={reattemptQuiz} style={styles.retryBtn}>
          <Text style={styles.answerText}>Reattempt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={answersScreen} style={styles.answerBtn}>
          <Text style={styles.answerText}>View Answers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScoreScreen;
