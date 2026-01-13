import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { navigate } from '../../../utils/NavigationUtil';
import { Colors } from '../../../constants/Colors';

const StartScreen = ({ route }: any) => {
  const { category, testTitle, testNumber } = route.params;

  const [testInfo, setTestInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        const doc = await firestore()
          .collection('QUIZ')
          .doc(category.id)
          .collection('TEST_LIST')
          .doc('TEST_INFO')
          .get();

        setTestInfo(doc.data());
      } catch (e) {
        console.log('TEST_INFO fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchTestInfo();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </SafeAreaView>
    );
  }

  const time = testInfo?.[`TEST${testNumber}_TIMER`];
  const testId = testInfo?.[`TEST${testNumber}_ID`];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{category.name}</Text>
      </View>

      {/* Test No */}
      <Text style={styles.testTitle}>{testTitle}</Text>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{category.noOfTests}</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>80</Text>
            <Text style={styles.statLabel}>Best Score</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>{time}</Text>
            <Text style={styles.statLabel}>Time (min)</Text>
          </View>
        </View>
      </View>

      {/* START */}
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() =>
          navigate('Questions', {
            categoryId: category.id,
            testId,
            time,
          })
        }
      >
        <Text style={styles.startText}>START</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StartScreen;
