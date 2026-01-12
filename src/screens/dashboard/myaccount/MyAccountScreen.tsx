import React from 'react';
import { View, Text } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { BottomTabParamList, DrawerParamList } from '../../../types/types';
import styles from './styles';

type Props = DrawerScreenProps<BottomTabParamList, 'Account'>;

const MyAccountScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Screen Content */}
      <View style={styles.content}>
        <Text>My Account</Text>
      </View>
    </View>
  );
};

export default MyAccountScreen;
