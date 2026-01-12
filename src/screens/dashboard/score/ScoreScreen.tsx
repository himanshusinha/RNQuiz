import React from 'react';
import { View, Text } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import CustomHeader from '../../../components/global/CustomHeader';
import { DrawerParamList } from '../../../types/types';
import styles from './styles';

type Props = DrawerScreenProps<DrawerParamList, 'Score'>;

const ScoreScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Score" navigation={navigation} showBack />
      <View style={styles.content}>
        <Text>Score</Text>
      </View>
    </View>
  );
};

export default ScoreScreen;
