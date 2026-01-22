import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../../types/types';
import CustomHeader from '../../components/global/CustomHeader';
import styles from './styles';
import { rules } from '../../constants/Data';

type NavigationProp = DrawerScreenProps<DrawerParamList, 'Rules'>['navigation'];

const RulesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <CustomHeader title="Rules" navigation={navigation} showBack />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {rules.map((rule, index) => (
          <View key={index} style={styles.ruleItem}>
            <Text style={styles.ruleIndex}>{index + 1}.</Text>
            <Text style={styles.ruleText}>{rule}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RulesScreen;
