import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import firestore, { getFirestore } from '@react-native-firebase/firestore';
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
import { useBookmarks } from '../../../context/BookMarkContext';
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';

const { width } = Dimensions.get('window');

const QuestionsScreen = ({ route }: any) => {
  const { categoryId, testId, time, categoryName, testNumber } = route.params;

  const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [remainingTime, setRemainingTime] = useState(time * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  const [palette, setPalette] = useState<QuestionPaletteItem[]>([]);
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [exitDialogVisible, setExitDialogVisible] = useState(false);

  const listRef = useRef<FlatList>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const { bookmarks, toggleBookmark } = useBookmarks();

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
          marked: false,
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
        startTimeRef.current = Date.now();
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
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  /* ---------------- OPTION SELECT ---------------- */
  const selectOption = (qIndex: number, optionIndex: number) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === qIndex
          ? { ...q, selected: q.selected === optionIndex ? null : optionIndex }
          : q,
      ),
    );

    setPalette(prev =>
      prev.map((p, i) =>
        i === qIndex
          ? {
              ...p,
              status: 'answered',
            }
          : p,
      ),
    );
  };

  const clearSelection = (qIndex: number) => {
    setQuestions(prev =>
      prev.map((q, i) => (i === qIndex ? { ...q, selected: null } : q)),
    );

    setPalette(prev =>
      prev.map((p, i) => (i === qIndex ? { ...p, status: 'notAnswered' } : p)),
    );
  };

  /* ---------------- RESULT LOGIC ---------------- */
  const calculateResult = (questions: QuestionWithAnswer[]) => {
    let correct = 0;
    let wrong = 0;
    let unAttempted = 0;
    let marked = 0;
    let score = 0;

    questions.forEach(q => {
      if (q.marked) marked++;

      if (q.selected === null) {
        unAttempted++;
      } else if (q.selected === q.ANSWER) {
        correct++;
        score += 10; // 10 marks per correct
      } else {
        wrong++;
      }
    });

    return {
      score,
      totalQuestions: questions.length,
      correct,
      wrong,
      unAttempted,
      marked,
    };
  };

  /* ---------------- SUBMIT / EXIT ---------------- */
  const confirmExit = async () => {
    if (timerRef.current) clearInterval(timerRef.current);

    const result = calculateResult(questions);

    // ✅ Store the score in Firestore
    try {
      const app = getApp();
      const db = getFirestore(app);
      const auth = getAuth(app);
      const user = auth.currentUser;

      if (user) {
        await db
          .collection('users')
          .doc(user.uid)
          .set(
            {
              [`scores.${testId}`]: {
                score: result.score,
                totalQuestions: result.totalQuestions,
                correct: result.correct,
                wrong: result.wrong,
                unAttempted: result.unAttempted,
                marked: result.marked,
                timeTaken: formatTime(remainingTime),
                timestamp: new Date(),
              },
            },
            { merge: true }, // ✅ merge so we don’t overwrite other fields
          );
      }
    } catch (err) {
      console.log('Error saving score:', err);
    }

    setExitDialogVisible(false);

    navigate('Score', {
      score: result.score,
      totalQuestions: result.totalQuestions,
      correct: result.correct,
      wrong: result.wrong,
      marked: result.marked,
      unAttempted: result.unAttempted,
      timeTaken: formatTime(remainingTime),
      questions,
      categoryId,
      categoryName,
      testNumber,
    });
  };

  /* ---------------- BOOKMARK ---------------- */
  const handleBookmark = () => {
    const question = questions[currentIndex];
    toggleBookmark({ ...question, marked: !question.marked });

    // local marked state update for ribbon
    setQuestions(prev =>
      prev.map((q, i) =>
        i === currentIndex ? { ...q, marked: !q.marked } : q,
      ),
    );
  };

  /* ---------------- RENDER QUESTION ---------------- */
  const renderItem = ({ item, index }: any) => {
    const options = [
      { key: 1, label: item.A },
      { key: 2, label: item.B },
      { key: 3, label: item.C },
      { key: 4, label: item.D },
    ].filter(o => o.label);

    return (
      <View style={{ width }}>
        <View style={styles.content}>
          {item.marked && (
            <View style={styles.markedRibbon}>
              <Text style={styles.markedText}>MARKED</Text>
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
              <Text style={styles.optionText}>
                {opt.key}. {opt.label}
              </Text>
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
        isBookmarked={questions[currentIndex]?.marked}
        onBookmarkPress={handleBookmark}
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
        onMark={() => {
          handleBookmark();
          setPalette(prev =>
            prev.map((p, i) =>
              i === currentIndex
                ? {
                    ...p,
                    status:
                      p.status === 'markedForReview'
                        ? 'notAnswered'
                        : 'markedForReview',
                  }
                : p,
            ),
          );
        }}
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
