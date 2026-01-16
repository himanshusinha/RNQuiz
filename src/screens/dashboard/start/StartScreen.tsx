import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { navigate } from '../../../utils/NavigationUtil';
import styles from './styles';
import CustomLoader from '../../../components/global/CustomLoader';
import CustomButton from '../../../components/global/CustomButton';
import TestInfoCard from '../../../components/quiz/TestInfoCard';
import CustomHeader from '../../../components/global/CustomHeader';
import { useNavigation } from '@react-navigation/native';

const StartScreen = ({ route }: any) => {
  const navigation = useNavigation<any>(); // ✅ IMPORTANT

  const categoryFromParams = route.params?.category;
  const categoryId = route.params?.categoryId ?? categoryFromParams?.id;
  const categoryName =
    route.params?.categoryName ?? categoryFromParams?.name ?? '';
  const testNumber = route.params?.testNumber;
  const currentTestNo = Number(testNumber);
  const lastScore = route.params?.lastScore;

  const [loading, setLoading] = useState(true);
  const [testInfo, setTestInfo] = useState<any>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [testTime, setTestTime] = useState<number>(0);

  useEffect(() => {
    if (!categoryId || !testNumber) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const infoSnap = await firestore()
          .collection('QUIZ')
          .doc(categoryId)
          .collection('TEST_LIST')
          .doc('TEST_INFO')
          .get();

        const info = infoSnap.data();
        if (!info) return;

        setTestInfo(info);
        setTestTime(info[`TEST${currentTestNo}_TIME`] ?? 0);

        const testId = info[`TEST${currentTestNo}_ID`];
        if (!testId) return;

        const qSnap = await firestore()
          .collection('Questions')
          .where('CATEGORY', '==', categoryId)
          .where('TEST', '==', testId)
          .get();

        setQuestionCount(qSnap.size);
      } catch (e) {
        console.log('StartScreen error:', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId, testNumber]);

  const navigateScreen = () => {
    if (!testInfo) return;

    navigate('Questions', {
      categoryId,
      testId: testInfo[`TEST${currentTestNo}_ID`],
      time: testTime,
      categoryName,
      testNumber: currentTestNo,
    });
  };

  if (loading) {
    return <CustomLoader visible />;
  }

  return (
    <View style={styles.container}>
      {/* ✅ FIXED HEADER */}
      <CustomHeader title={categoryName} navigation={navigation} showBack />

      <Text style={styles.testTitle}>Test No. {currentTestNo}</Text>

      <TestInfoCard
        bestScore={lastScore ?? 0}
        questionCount={questionCount}
        testTime={testTime}
      />

      <CustomButton
        containerStyle={styles.startButton}
        title={questionCount === 0 ? 'No Questions' : 'Start Quiz'}
        onPress={navigateScreen}
        disabled={questionCount === 0}
      />
    </View>
  );
};

export default StartScreen;
