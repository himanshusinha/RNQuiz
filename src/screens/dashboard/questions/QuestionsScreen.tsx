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
import { goBack, navigate } from '../../../utils/NavigationUtil';
import styles from './styles';
import QuestionPaletteModal from '../../../components/modal/QuestionPallette';
import ExitTestDialog from '../../../components/dialog/ExitTestDialog';
const { width } = Dimensions.get('window');

const QuestionsScreen = ({ route }: any) => {
  const { categoryId, testId, time, categoryName } = route.params;
  const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(time * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [palette, setPalette] = useState<QuestionPaletteItem[]>([]);
  const [exitDialogVisible, setExitDialogVisible] = useState(false);
  const listRef = useRef<FlatList>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const list: QuestionPaletteItem[] = Array.from(
      { length: questions.length },
      (_, i) => ({
        questionNo: i + 1,
        status: 'notVisited',
      }),
    );

    setPalette(list);
  }, [questions.length]);
  useEffect(() => {
    if (!loading && questions.length > 0) {
      startTimeRef.current = Date.now();
      setTimerRunning(true);
    }
  }, [loading, questions.length]);

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

    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000) as unknown as number;

    return () => {
      if (timerRef.current !== null) {
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

  const updateQuestions = (data: QuestionWithAnswer[]) => {
    const temp = data.map(item => ({ ...item }));
    setQuestions(temp);
  };

  const selectOption = (qIndex: number, option: string) => {
    const data = questions.map((item, index) => {
      if (index === qIndex) {
        return {
          ...item,
          selected: item.selected === option ? null : option,
        };
      }
      return item;
    });

    setQuestions(data);

    setPalette(prev =>
      prev.map((item, i) =>
        i === qIndex
          ? {
              ...item,
              status:
                data[qIndex].selected === null ? 'notAnswered' : 'answered',
            }
          : item,
      ),
    );
  };

  const clearSelection = (qIndex: number) => {
    const data = [...questions];
    data[qIndex] = { ...data[qIndex], selected: null };
    setQuestions(data);

    setPalette(prev =>
      prev.map((item, i) =>
        i === qIndex ? { ...item, status: 'notAnswered' } : item,
      ),
    );
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

  const openExitDialog = () => {
    setIsTimerPaused(true);
    setExitDialogVisible(true);
  };

  const closeExitDialog = () => {
    setExitDialogVisible(false);
    setIsTimerPaused(false);
  };

  const confirmExit = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setTimerRunning(false);
    setIsTimerPaused(false);
    setExitDialogVisible(false);

    const result = calculateResult();

    navigate('Score', {
      score: result.score,
      totalQuestions: result.totalQuestions,
      correct: result.correct,
      wrong: result.wrong,
      unAttempted: result.unAttempted,
      timeTaken: formatTime(remainingTime),
    });
  };

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
      score: correct * 10, // ya jo logic chaho
    };
  };

  const renderItem = ({ item, index }: any) => {
    const options = [item.A, item.B, item.C, item.D].filter(Boolean);

    return (
      <View style={{ width }}>
        <View style={styles.content}>
          <View style={styles.questionBox}>
            {palette[index]?.status === 'markedForReview' && (
              <View style={styles.markedRibbon}>
                <Text style={styles.markedText}>Marked</Text>
              </View>
            )}

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
        time={isTimerPaused ? 'PAUSED' : formatTime(remainingTime)}
        timerRunning={timerRunning}
        onBack={() => goBack()}
        onSubmit={openExitDialog}
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
            prev.map((item, i) =>
              i === index && item.status === 'notVisited'
                ? { ...item, status: 'notAnswered' }
                : item,
            ),
          );
        }}
      />

      <CustomQuizBottomBar
        isFirst={currentIndex === 0}
        isLast={currentIndex === questions.length - 1}
        onPrev={goPrev}
        onNext={goNext}
        onClear={() => clearSelection(currentIndex)}
        onMark={() => {
          setPalette(prev =>
            prev.map((item, i) =>
              i === currentIndex
                ? { ...item, status: 'markedForReview' }
                : item,
            ),
          );
        }}
      />
      <QuestionPaletteModal
        visible={paletteVisible}
        onClose={() => setPaletteVisible(false)}
        palette={palette}
        onSelectQuestion={qNo => {
          listRef.current?.scrollToIndex({
            index: qNo - 1,
            animated: true,
          });
        }}
      />
      <ExitTestDialog
        visible={exitDialogVisible}
        onCancel={closeExitDialog}
        onConfirm={confirmExit}
      />
    </SafeAreaView>
  );
};

export default QuestionsScreen;
