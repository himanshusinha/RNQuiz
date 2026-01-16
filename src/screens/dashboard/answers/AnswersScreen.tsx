import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import CustomHeader from '../../../components/global/CustomHeader';
import { RootStackParamList } from '../../../types/types';
import styles from './styles';

type AnswersRouteProp = RouteProp<RootStackParamList, 'Answers'>;

const AnswersScreen = () => {
  const route = useRoute<AnswersRouteProp>();
  const navigation = useNavigation<any>();
  const { questions } = route.params;

  const renderItem = ({ item, index }: any) => {
    const options = [
      { key: 1, label: item.A },
      { key: 2, label: item.B },
      { key: 3, label: item.C },
      { key: 4, label: item.D },
    ].filter(o => o.label);

    const isUnattempted = item.selected === null;
    const isMarked = item.marked === true;

    return (
      <View style={styles.card}>
        {isMarked && (
          <View style={styles.markedBadge}>
            <Text style={styles.markedText}>MARKED</Text>
          </View>
        )}

        <Text style={styles.question}>
          Q {index + 1}. {item.QUESTION}
        </Text>

        {options.map(opt => {
          const isCorrect = opt.key === item.ANSWER;
          const isSelected = opt.key === item.selected;
          const isWrong = isSelected && !isCorrect;

          return (
            <View
              key={opt.key}
              style={[
                styles.option,
                isCorrect && styles.correctOption,
                isWrong && styles.wrongOption,
              ]}
            >
              <Text style={styles.optionText}>
                {opt.key}. {opt.label}
              </Text>

              {isCorrect && <Text style={styles.correctText}>CORRECT</Text>}
              {isWrong && <Text style={styles.wrongText}>YOUR ANSWER</Text>}
            </View>
          );
        })}

        {isUnattempted && (
          <Text style={styles.unattemptedText}>UNATTEMPTED</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Answers" navigation={navigation} showBack />

      <FlatList
        data={questions}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default AnswersScreen;
