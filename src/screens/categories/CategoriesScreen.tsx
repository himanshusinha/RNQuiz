import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import CategoriesItem from '../../components/list/CategoriesItem';
import { RootStackParamList, TestItem } from '../../types/types';
import styles from './styles';
import CustomLoader from '../../components/global/CustomLoader';

type CategoriesRouteProp = RouteProp<RootStackParamList, 'Categories'>;

const CategoriesScreen: React.FC = () => {
  const route = useRoute<CategoriesRouteProp>();
  const { category } = route.params;

  const [tests, setTests] = useState<TestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const docSnap = await firestore()
          .collection('QUIZ')
          .doc(category.id)
          .collection('TEST_LIST')
          .doc('TEST_INFO')
          .get();

        if (!docSnap.exists()) return;

        const data = docSnap.data();
        const list: TestItem[] = [];

        for (let i = 1; i <= category.noOfTests; i++) {
          const testId = data?.[`TEST${i}_ID`];
          let questionCount = 0;

          if (testId) {
            const qSnap = await firestore()
              .collection('Questions')
              .where('CATEGORY', '==', category.id)
              .where('TEST', '==', testId)
              .get();

            questionCount = qSnap.size;
          }

          list.push({
            id: testId ?? `TEST${i}`,
            title: `Test No : ${i}`,
            progress: 0,
            testNumber: i,
            questionCount,
          });
        }

        setTests(list);
      } catch (error) {
        console.log('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [category.id, category.noOfTests]);

  return (
    <View style={styles.container}>
      {loading && <CustomLoader visible={true} />}

      <FlatList
        data={tests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CategoriesItem item={item} category={category} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesScreen;
