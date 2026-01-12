import React from 'react';
import { View, Text } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../components/global/CustomHeader';
import { DrawerParamList } from '../../../types/types';
import styles from './styles';

type NavigationProp = DrawerScreenProps<
  DrawerParamList,
  'BookMark'
>['navigation'];

const BookMarkScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <CustomHeader title="BookMark" navigation={navigation} showBack />
      <View style={styles.content}>
        <Text>BookMarkScreen</Text>
      </View>
    </View>
  );
};

export default BookMarkScreen;
