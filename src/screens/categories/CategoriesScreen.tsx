import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import CategoriesItem from '../../components/list/CategoriesItem';
import { RootStackParamList } from '../../types/types';
import { Colors } from '../../constants/Colors';
import { TestItem } from '../../types/types';

type CategoriesRouteProp = RouteProp<RootStackParamList, 'Categories'>;

const CategoriesScreen: React.FC = () => {
  const route = useRoute<CategoriesRouteProp>();
  const { category } = route.params;
  console.log(category.noOfTests);
  const [tests, setTests] = useState<TestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [noOfTests, setNoOfTests] = useState();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const docSnap = await firestore()
          .collection('QUIZ')
          .doc(category.id)
          .collection('TEST_LIST')
          .doc('TEST_INFO')
          .get();

        if (docSnap.exists()) {
          const data = docSnap.data();
          const list: TestItem[] = [];

          for (let i = 1; i <= category.noOfTests; i++) {
            list.push({
              id: data?.[`TEST${i}_ID`] ?? `TEST${i}`, // ✅ safe fallback
              title: `Test No : ${i}`,
              progress: 0,
              testNumber: i, // ✅ IMPORTANT
            });
          }

          setTests(list);
        }
      } catch (error) {
        console.log('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [category.id, category.noOfTests]);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.blue} />;
  }

  return (
    <View style={styles.container}>
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
