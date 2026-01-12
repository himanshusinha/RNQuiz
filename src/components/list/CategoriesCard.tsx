// components/CategoryCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';

const CategoryCard = ({ item, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.count}>{item.count}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
