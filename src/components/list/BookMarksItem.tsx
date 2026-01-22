import { View, Text } from 'react-native';
import React from 'react';
import { BookMarkItemProps } from '../../types/types';
import styles from './BookMarkItem.styles';
const BookMarksItem: React.FC<BookMarkItemProps> = ({ item, index }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.qNo}></Text>
      {item.marked && (
        <View style={styles.markedBadge}>
          <Text style={styles.markedText}>MARKED</Text>
        </View>
      )}

      <Text style={styles.question}>
        Q {index + 1} {item.QUESTION}
      </Text>

      {item.A && (
        <View style={styles.option}>
          <Text style={styles.optionText}>A. {item.A}</Text>
        </View>
      )}
      {item.B && (
        <View style={styles.option}>
          <Text style={styles.optionText}>B. {item.B}</Text>
        </View>
      )}
      {item.C && (
        <View style={styles.option}>
          <Text style={styles.optionText}>C. {item.C}</Text>
        </View>
      )}
      {item.D && (
        <View style={styles.option}>
          <Text style={styles.optionText}>D. {item.D}</Text>
        </View>
      )}
    </View>
  );
};

export default BookMarksItem;
