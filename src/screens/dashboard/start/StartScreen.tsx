import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { goBack, navigate } from '../../../utils/NavigationUtil';
import styles from './styles';
import CustomLoader from '../../../components/global/CustomLoader';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../constants/Colors';
import CustomButton from '../../../components/global/CustomButton';
import TestInfoCard from '../../../components/quiz/TestInfoCard';

const StartScreen = ({ route }: any) => {
  const category = route.params?.category;
  const testNumber = route.params?.testNumber;
  const currentTestNo = Number(testNumber);

  const [loading, setLoading] = useState(true);
  const [testInfo, setTestInfo] = useState<any>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [testTime, setTestTime] = useState<number>(0);

  useEffect(() => {
    if (!category || !testNumber) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        // 1️⃣ TEST INFO
        const infoSnap = await firestore()
          .collection('QUIZ')
          .doc(category.id)
          .collection('TEST_LIST')
          .doc('TEST_INFO')
          .get();

        const info = infoSnap.data();
        if (!info) return;

        setTestInfo(info);
        setTestTime(info[`TEST${currentTestNo}_TIME`] ?? 0);

        // 2️⃣ QUESTION COUNT
        const testId = info[`TEST${currentTestNo}_ID`];
        if (!testId) return;

        const qSnap = await firestore()
          .collection('Questions')
          .where('CATEGORY', '==', category.id)
          .where('TEST', '==', testId)
          .get();

        setQuestionCount(qSnap.size);
      } catch (e) {
        console.log('StartScreen error:', e);
      } finally {
        setLoading(false); // ✅ ONLY PLACE
      }
    };

    loadData();
  }, [category, testNumber]);

  const navigateScreen = () => {
    navigate('Questions', {
      categoryId: category.id,
      testId: testInfo[`TEST${currentTestNo}_ID`],
      time: testTime,
      categoryName: category.name,
    });
  };

  if (loading) {
    return <CustomLoader visible />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={goBack}>
          <Icon name="chevron-back" size={26} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name}</Text>
      </View>

      <Text style={styles.testTitle}>Test No. {currentTestNo}</Text>

      <TestInfoCard
        questionCount={questionCount}
        bestScore={80}
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
