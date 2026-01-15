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

import {
  Question,
  QuestionPaletteItem,
  QuestionWithAnswer,
} from '../../../types/types';
import CustomLoader from '../../../components/global/CustomLoader';
import QuizTopHeader from '../../../components/global/CustomQuizHeader';
import CustomBookMarkHeader from '../../../components/global/CustomBookMarkHeader';
import CustomQuizBottomBar from '../../../components/global/CustomQuizBottomBar';
import QuestionPaletteModal from '../../../components/modal/QuestionPallette';
import ExitTestDialog from '../../../components/dialog/ExitTestDialog';

import { goBack, navigate } from '../../../utils/NavigationUtil';
import styles from './styles';

const { width } = Dimensions.get('window');

const QuestionsScreen = ({ route }: any) => {
  const { categoryId, testId, time, categoryName } = route.params;
  const category = route.params?.category;
  const testNumber = route.params?.testNumber;
  const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [remainingTime, setRemainingTime] = useState(time * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  const [palette, setPalette] = useState<QuestionPaletteItem[]>([]);
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [exitDialogVisible, setExitDialogVisible] = useState(false);

  const listRef = useRef<FlatList>(null);
  const timerRef = useRef<number | null>(null);

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

        setPalette(
          list.map((_, i) => ({
            questionNo: i + 1,
            status: 'notVisited',
          })),
        );
      } catch (e) {
        console.log('Question fetch error:', e);
      } finally {
        setLoading(false);
        setTimerRunning(true);
      }
    };

    fetchQuestions();
  }, [categoryId, testId]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!timerRunning) return;

    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000) as any;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  /* ---------------- SELECT OPTION (FIXED) ---------------- */
  const selectOption = (qIndex: number, optionIndex: number) => {
    const updated = questions.map((q, i) =>
      i === qIndex
        ? { ...q, selected: q.selected === optionIndex ? null : optionIndex }
        : q,
    );

    setQuestions(updated);

    setPalette(prev =>
      prev.map((p, i) =>
        i === qIndex
          ? {
              ...p,
              status:
                updated[qIndex].selected === null ? 'notAnswered' : 'answered',
            }
          : p,
      ),
    );
  };

  const clearSelection = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].selected = null;
    setQuestions(updated);

    setPalette(prev =>
      prev.map((p, i) => (i === qIndex ? { ...p, status: 'notAnswered' } : p)),
    );
  };

  /* ---------------- RESULT LOGIC (100% CORRECT) ---------------- */
  const calculateResult = () => {
    let correct = 0;
    let wrong = 0;
    let unAttempted = 0;

    questions.forEach(q => {
      if (q.selected === null) {
        unAttempted++;
      } else if (q.selected === q.ANSWER) {
        correct++;
      } else {
        wrong++;
      }
    });

    return {
      correct,
      wrong,
      unAttempted,
      totalQuestions: questions.length,
      score: correct * 10,
    };
  };

  const confirmExit = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const result = calculateResult();

    setExitDialogVisible(false);

    navigate('Score', {
      score: result.score,
      totalQuestions: result.totalQuestions,
      correct: result.correct,
      wrong: result.wrong,
      unAttempted: result.unAttempted,
      timeTaken: formatTime(remainingTime), // ✅ SAME TIME
    });
  };

  /* ---------------- RENDER ITEM ---------------- */
  const renderItem = ({ item, index }: any) => {
    const options = [
      { key: 1, label: item.A },
      { key: 2, label: item.B },
      { key: 3, label: item.C },
      { key: 4, label: item.D },
    ].filter(o => o.label);

    const isMarked = palette[index]?.status === 'markedForReview';

    return (
      <View style={{ width }}>
        <View style={styles.content}>
          {isMarked && (
            <View style={styles.markedRibbon}>
              <Text style={styles.markedText}>Marked</Text>
            </View>
          )}

          <Text style={styles.question}>{item.QUESTION}</Text>

          {options.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.option,
                item.selected === opt.key && styles.selectedOption,
              ]}
              onPress={() => selectOption(index, opt.key)}
            >
              <Text style={styles.optionText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomLoader visible />
      </View>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <SafeAreaView style={styles.container}>
      <QuizTopHeader
        title={categoryName}
        current={currentIndex + 1}
        total={questions.length}
        time={formatTime(remainingTime)}
        timerRunning={timerRunning}
        onBack={goBack}
        onSubmit={() => setExitDialogVisible(true)}
      />

      <CustomBookMarkHeader
        title={categoryName}
        isBookmarked={false}
        onMenuPress={() => setPaletteVisible(true)}
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

          setPalette(prev =>
            prev.map((p, i) =>
              i === index && p.status === 'notVisited'
                ? { ...p, status: 'notAnswered' }
                : p,
            ),
          );
        }}
      />

      <CustomQuizBottomBar
        isFirst={currentIndex === 0}
        isLast={currentIndex === questions.length - 1}
        onPrev={() =>
          listRef.current?.scrollToIndex({ index: currentIndex - 1 })
        }
        onNext={() =>
          listRef.current?.scrollToIndex({ index: currentIndex + 1 })
        }
        onClear={() => clearSelection(currentIndex)}
        onMark={() =>
          setPalette(prev =>
            prev.map((p, i) =>
              i === currentIndex ? { ...p, status: 'markedForReview' } : p,
            ),
          )
        }
      />

      <QuestionPaletteModal
        visible={paletteVisible}
        palette={palette}
        onClose={() => setPaletteVisible(false)}
        onSelectQuestion={qNo =>
          listRef.current?.scrollToIndex({ index: qNo - 1 })
        }
      />

      <ExitTestDialog
        visible={exitDialogVisible}
        onCancel={() => setExitDialogVisible(false)}
        onConfirm={confirmExit}
      />
    </SafeAreaView>
  );
};

export default QuestionsScreen;
