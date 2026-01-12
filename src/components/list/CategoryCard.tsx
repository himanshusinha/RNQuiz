// components/CategoryCard.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './CategoryCard.styles';
import { CategoryCardProps } from '../../types/types';

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress(item)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.count}>{item.count}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
