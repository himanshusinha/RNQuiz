import React from 'react';
import { View, Text } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../components/global/CustomHeader';
import { DrawerParamList } from '../../../types/types';
import styles from './styles';

type NavigationProp = DrawerScreenProps<
  DrawerParamList,
  'MyAccount'
>['navigation'];

const MyAccountScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <CustomHeader title="My Account" navigation={navigation} showBack />
      <View style={styles.content}>
        <Text>MyAccount</Text>
      </View>
    </View>
  );
};

export default MyAccountScreen;
