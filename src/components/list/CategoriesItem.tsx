import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { CategoriesItemProps } from '../../types/types';
import CustomLineProgressBar from '../global/CustomLineProgressBar';
import { navigate } from '../../utils/NavigationUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
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
      style={[styles.card, isLocked && { opacity: 0.5 }]}
    >
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.countText}>{item.questionCount} Questions</Text>

      <CustomLineProgressBar progress={item.progress} />

      {isLocked && (
        <View style={styles.lockIcon}>
          <MaterialIcons name="lock" size={22} color={Colors.gray} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },

  card: {
    backgroundColor: Colors.white,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,

    // Android shadow
    elevation: 6,

    // iOS shadow
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
    color: Colors.black,
  },
  countText: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 6,
  },

  lockIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CategoriesItem;
