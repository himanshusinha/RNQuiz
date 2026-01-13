import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { Colors } from '../../../constants/Colors';
import { Question } from '../../../types/types';

const QuestionsScreen = ({ route }: any) => {
  const { categoryId } = route.params;
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
  }, [categoryId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </SafeAreaView>
    );
  }

  const question = questions[currentIndex];
  const options = [question.A, question.B, question.C, question.D];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.count}>
          {currentIndex + 1}/{questions.length}
        </Text>
        <Text style={styles.timer}>20 : 15 min</Text>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subjectBar}>
        <Text style={styles.subjectText}>GK</Text>
      </View>

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
            <View style={styles.radio} />
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => currentIndex > 0 && setCurrentIndex(i => i - 1)}
        >
          <Text style={styles.navText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setSelected(null)}
        >
          <Text style={styles.actionText}>CLEAR SELECTION</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>MARK FOR REVIEW</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            currentIndex < questions.length - 1 && setCurrentIndex(i => i + 1)
          }
        >
          <Text style={styles.navText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuestionsScreen;
