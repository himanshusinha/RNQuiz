import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, QuestionPaletteItem } from '../../../types/types';
import styles from './styles';

const QuestionPaletteScreen = () => {
  const data: QuestionPaletteItem[] = [
    { questionNo: 1, status: 'answered' },
    { questionNo: 2, status: 'notAnswered' },
    { questionNo: 3, status: 'markedForReview' },
    { questionNo: 4, status: 'notVisited' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Question Palette</Text>

      <FlatList
        data={data}
        numColumns={5}
        keyExtractor={item => item.questionNo.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.paletteItem,
              { backgroundColor: COLORS[item.status] },
            ]}
          >
            <Text style={styles.questionNoTitle}>{item.questionNo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default QuestionPaletteScreen;
