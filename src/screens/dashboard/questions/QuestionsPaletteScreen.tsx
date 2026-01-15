import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, QuestionPaletteItem } from '../../../types/types';

const QuestionPaletteScreen = () => {
  const data: QuestionPaletteItem[] = [
    { questionNo: 1, status: 'answered' },
    { questionNo: 2, status: 'notAnswered' },
    { questionNo: 3, status: 'markedForReview' },
    { questionNo: 4, status: 'notVisited' },
  ];

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
        Question Palette
      </Text>

      <FlatList
        data={data}
        numColumns={5}
        keyExtractor={item => item.questionNo.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              margin: 6,
              borderRadius: 8,
              backgroundColor: COLORS[item.status],
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              {item.questionNo}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default QuestionPaletteScreen;
