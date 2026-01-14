import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack, navigate } from '../../../utils/NavigationUtil';
import styles from './styles';
import CustomLoader from '../../../components/global/CustomLoader';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../constants/Colors';

const StartScreen = ({ route }: any) => {
  const { category, testNumber } = route.params;
  console.log(category.name);
  const [testInfo, setTestInfo] = useState<any>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [testTime, setTestTime] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const currentTestNo = Number(testNumber);

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

  return (
    <View style={styles.container}>
      <CustomLoader visible={loading} />

      <>
        <View style={styles.header}>
          <TouchableOpacity style={{ marginTop: 20 }}>
            <Icon
              name="chevron-back"
              size={26}
              color={Colors.white}
              onPress={() => goBack()}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{category.name}</Text>
        </View>

        <Text style={styles.testTitle}>Test No. {currentTestNo}</Text>

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

        <TouchableOpacity
          style={[styles.startBtn, questionCount === 0 && { opacity: 0.5 }]}
          disabled={questionCount === 0}
          onPress={() =>
            navigate('Questions', {
              categoryId: category.id,
              testId: testInfo[`TEST${currentTestNo}_ID`],
              time: testTime,
              categoryName: category.name,
            })
          }
        >
          <Text style={styles.startText}>
            {questionCount === 0 ? 'NO QUESTIONS' : 'START'}
          </Text>
        </TouchableOpacity>
      </>
    </View>
  );
};

export default StartScreen;
