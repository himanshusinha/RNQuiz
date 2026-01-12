// screens/HomeScreen.tsx
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { categories } from '../../../constants/Data';
import CategoryCard from '../../../components/list/CategoriesCard';
import { Colors } from '../../../constants/Colors';
import styles from './styles';

const HomeScreen = () => {
  const onCategoryPress = (item: any) => {
    console.log('Clicked:', item.title);
  };

  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={false}
        data={categories}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryCard item={item} onPress={onCategoryPress} />
        )}
      />
    </View>
  );
};

export default HomeScreen;
