import React from 'react';
import { View, Text } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../../types/types';
import CustomHeader from '../../components/global/CustomHeader';
import styles from './styles';

type NavigationProp = DrawerScreenProps<DrawerParamList, 'Rules'>['navigation'];

const RulesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <CustomHeader title="Rules" navigation={navigation} showBack />
      <View style={styles.content}>
        <Text>Rules</Text>
      </View>
    </View>
  );
};

export default RulesScreen;
