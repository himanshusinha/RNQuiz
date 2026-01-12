import React from 'react';
import { View, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import styles from './styles';
import { tests } from '../../constants/Data';
import CategoriesItem from '../../components/list/CategoriesItem';

type CategoriesRouteProp = RouteProp<RootStackParamList, 'Categories'>;

const CategoriesScreen: React.FC = () => {
  const route = useRoute<CategoriesRouteProp>();
  // route.params future me use kar sakte ho

  return (
    <View style={styles.container}>
      <FlatList
        data={tests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CategoriesItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesScreen;
