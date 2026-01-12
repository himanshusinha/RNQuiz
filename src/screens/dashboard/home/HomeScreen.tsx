import React from 'react';
import { View, FlatList } from 'react-native';
import { categories } from '../../../constants/Data';
import styles from './styles';
import CategoryCard from '../../../components/list/CategoryCard';
import { navigate } from '../../../utils/NavigationUtil';

const HomeScreen: React.FC = () => {
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
