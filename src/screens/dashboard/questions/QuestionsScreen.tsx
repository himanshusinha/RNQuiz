import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { Colors } from '../../../constants/Colors';
import { Question } from '../../../types/types';

const QuestionsScreen = ({ route }: any) => {
  const { categoryId, testId, time } = route.params;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const snapshot = await firestore()
          .collection('Questions')
          .where('CATEGORY', '==', categoryId)
          .where('TEST', '==', testId)
          .get();

        const list: Question[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Question, 'id'>),
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </SafeAreaView>
    );
  }

  if (!questions.length || !questions[currentIndex]) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
          No questions found
        </Text>
      </SafeAreaView>
    );
  }

  const question = questions[currentIndex];
  const options = [question.A, question.B, question.C, question.D].filter(
    Boolean,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.count}>
          {currentIndex + 1}/{questions.length}
        </Text>

        <Text style={styles.timer}>{time} min</Text>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subjectBar}>
        <Text style={styles.subjectText}>GK</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.content}>
          <View style={styles.questionBox}>
            <Text style={styles.question}>{question.QUESTION}</Text>
          </View>

          {options.map((opt, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, selected === opt && styles.selectedOption]}
              onPress={() => setSelected(opt)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={() => {
            setSelected(null);
            setCurrentIndex(prev => prev - 1);
          }}
        >
          <Text style={styles.navText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setSelected(null)}
        >
          <Text style={styles.actionText}>CLEAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>MARK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={currentIndex === questions.length - 1}
          onPress={() => {
            setSelected(null);
            setCurrentIndex(prev => prev + 1);
          }}
        >
          <Text style={styles.navText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuestionsScreen;
