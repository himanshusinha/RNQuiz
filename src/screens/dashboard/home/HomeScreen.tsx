import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CategoryCard from '../../../components/list/CategoryCard';
import { navigate } from '../../../utils/NavigationUtil';
import { Colors } from '../../../constants/Colors';
import { Category } from '../../../types/types';
import styles from './styles';

const HomeScreen: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await firestore().collection('QUIZ').get();
        const list: Category[] = snapshot.docs
          .filter(doc => doc.id !== 'Categories')
          .map(doc => ({
            id: doc.id,
            name: doc.data().NAME,
            noOfTests: doc.data().NO_OF_TESTS,
          }));
        setCategories(list);
      } catch (error) {
        console.log('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Loader
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryCard
            item={item}
            onPress={() =>
              navigate('Categories', {
                category: item,
              })
            }
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;
