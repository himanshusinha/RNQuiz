import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

import { navigate } from '../../../utils/NavigationUtil';
import { Colors } from '../../../constants/Colors';
import styles from './styles';
import CustomLoader from '../../../components/global/CustomLoader';

const StartScreen = ({ route }: any) => {
  const { category, testNumber } = route.params;

  const [testInfo, setTestInfo] = useState<any>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [testTime, setTestTime] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const currentTestNo = Number(testNumber);

  /* ------------------ Fetch TEST_INFO ------------------ */
  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        const snap = await firestore()
          .collection('QUIZ')
          .doc(category.id)
          .collection('TEST_LIST')
          .doc('TEST_INFO')
          .get();

        const data = snap.data();
        setTestInfo(data);
        setTestTime(data?.[`TEST${currentTestNo}_TIME`] ?? 0);
      } catch (e) {
        console.log('TEST_INFO error:', e);
      }
    };

    fetchTestInfo();
  }, [category.id, currentTestNo]);

  /* ------------------ Fetch Question Count ------------------ */
  useEffect(() => {
    if (!testInfo) return;

    const testId = testInfo[`TEST${currentTestNo}_ID`];
    if (!testId) {
      setLoading(false);
      return;
    }

    const fetchQuestionCount = async () => {
      try {
        const snap = await firestore()
          .collection('Questions')
          .where('CATEGORY', '==', category.id)
          .where('TEST', '==', testId)
          .get();

        setQuestionCount(snap.size);
      } catch (e) {
        console.log('Question count error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionCount();
  }, [testInfo, category.id, currentTestNo]);

  /* ------------------ UI ------------------ */
  return (
    <SafeAreaView style={styles.container}>
      {/* 🔥 Custom Loader */}
      <CustomLoader visible={loading} />

      {!loading && (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{category.name}</Text>
          </View>

          {/* Test No */}
          <Text style={styles.testTitle}>Test No. {currentTestNo}</Text>

          {/* Stats Card */}
          <View style={styles.card}>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{questionCount}</Text>
                <Text style={styles.statLabel}>Questions</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>80</Text>
                <Text style={styles.statLabel}>Best Score</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>{testTime}</Text>
                <Text style={styles.statLabel}>Time (min)</Text>
              </View>
            </View>
          </View>

          {/* Start Button */}
          <TouchableOpacity
            style={[styles.startBtn, questionCount === 0 && { opacity: 0.5 }]}
            disabled={questionCount === 0}
            onPress={() =>
              navigate('Questions', {
                categoryId: category.id,
                testId: testInfo[`TEST${currentTestNo}_ID`],
                time: testTime,
              })
            }
          >
            <Text style={styles.startText}>
              {questionCount === 0 ? 'NO QUESTIONS' : 'START'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default StartScreen;
