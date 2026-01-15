import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { CategoriesItemProps } from '../../types/types';
import CustomLineProgressBar from '../global/CustomLineProgressBar';
import { navigate } from '../../utils/NavigationUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import styles from './CategoriesItem.styles';

const CategoriesItem: React.FC<CategoriesItemProps> = ({ item, category }) => {
  const isLocked = item.questionCount === 0;

  return (
    <TouchableOpacity
      disabled={isLocked}
      onPress={() =>
        navigate('Start', {
          category,
          testId: item.id,
          testTitle: item.title,
          testNumber: item.testNumber,
        })
      }
      style={[styles.card, isLocked && styles.disabledCard]}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{item.title}</Text>

      {/* ✅ Question Count / No Test Available */}
      <Text style={[styles.countText, isLocked && styles.noTestText]}>
        {item.questionCount > 0
          ? `${item.questionCount} Questions`
          : 'No Test Available'}
      </Text>

      <CustomLineProgressBar progress={item.progress} />

      {/* 🔒 Lock Icon */}
      {isLocked && (
        <View style={styles.lockIcon}>
          <MaterialIcons name="lock" size={22} color={Colors.gray} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CategoriesItem;
