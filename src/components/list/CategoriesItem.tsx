import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { CategoriesItemProps } from '../../types/types';
import CustomLineProgressBar from '../global/CustomLineProgressBar';
import { Colors } from '../../constants/Colors';
import { navigate } from '../../utils/NavigationUtil';

const CategoriesItem: React.FC<CategoriesItemProps> = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Questions')} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>

      <CustomLineProgressBar progress={item.progress} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // screen background
    padding: 16,
  },

  card: {
    backgroundColor: '#FFFFFF', // ✅ MUST be white
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,

    // ✅ Android shadow
    elevation: 6,

    // ✅ iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#222',
  },
});

export default CategoriesItem;
