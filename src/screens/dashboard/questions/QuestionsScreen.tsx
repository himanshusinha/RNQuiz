import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Question, QuestionWithAnswer } from '../../../types/types';
import CustomLoader from '../../../components/global/CustomLoader';
import QuizTopHeader from '../../../components/global/CustomQuizHeader';
import CustomBookMarkHeader from '../../../components/global/CustomBookMarkHeader';
import CustomQuizBottomBar from '../../../components/global/CustomQuizBottomBar';
import { goBack } from '../../../utils/NavigationUtil';
import styles from './styles';

const { width } = Dimensions.get('window');

const QuestionsScreen = ({ route }: any) => {
  const { categoryId, testId, time, categoryName } = route.params;

  const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔥 TIMER
  const [remainingTime, setRemainingTime] = useState(time * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  const listRef = useRef<FlatList>(null);

  /* ---------------- FETCH QUESTIONS ---------------- */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const snap = await firestore()
          .collection('Questions')
          .where('CATEGORY', '==', categoryId)
          .where('TEST', '==', testId)
          .get();

        const list: QuestionWithAnswer[] = snap.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Question, 'id'>),
          selected: null,
        }));

        setQuestions(list);
      } catch (e) {
        console.log('Question fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId, testId]);

  useEffect(() => {
    if (!loading && questions.length > 0) {
      setTimerRunning(true);
    }
  }, [loading, questions.length]);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerRunning(false);
          console.log('⏰ Time Up');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const updateQuestions = (data: QuestionWithAnswer[]) => {
    const temp = data.map(item => ({ ...item }));
    setQuestions(temp);
  };

  const selectOption = (qIndex: number, option: string) => {
    const data = questions;
    data.forEach((item, index) => {
      if (index === qIndex) {
        item.selected = item.selected === option ? null : option;
      }
    });
    updateQuestions(data);
  };

  const clearSelection = (qIndex: number) => {
    const data = questions;
    data[qIndex].selected = null;
    updateQuestions(data);
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      listRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      listRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomLoader visible />
      </View>
    );
  }

  const renderItem = ({ item, index }: any) => {
    const options = [item.A, item.B, item.C, item.D].filter(Boolean);

    return (
      <View style={{ width }}>
        <View style={styles.content}>
          <View style={styles.questionBox}>
            <Text style={styles.question}>{item.QUESTION}</Text>
          </View>

          {options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                item.selected === opt && styles.selectedOption,
              ]}
              onPress={() => selectOption(index, opt)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <QuizTopHeader
        title={categoryName}
        current={currentIndex + 1}
        total={questions.length}
        time={formatTime(remainingTime)}
        timerRunning={timerRunning}
        onBack={() => goBack()}
        onSubmit={() => console.log('Submit')}
      />

      <CustomBookMarkHeader
        title={categoryName}
        isBookmarked={false}
        onMenuPress={() => console.log('Menu')}
      />

      <FlatList
        ref={listRef}
        data={questions}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <CustomQuizBottomBar
        isFirst={currentIndex === 0}
        isLast={currentIndex === questions.length - 1}
        onPrev={goPrev}
        onNext={goNext}
        onClear={() => clearSelection(currentIndex)}
        onMark={() => console.log('Marked')}
      />
    </SafeAreaView>
  );
};

export default QuestionsScreen;
