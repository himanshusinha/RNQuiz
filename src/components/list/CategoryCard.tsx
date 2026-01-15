import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './CategoryCard.styles';
import { CategoryCardProps } from '../../types/types';

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.count}>{item.noOfTests}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
