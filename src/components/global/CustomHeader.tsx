import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './CustomHeader.styles';
import { Colors } from '../../constants/Colors';
import { CustomHeaderProps } from '../../types/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { ParamListBase } from '@react-navigation/native';

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  navigation,
  showBack = false,
}) => {
  // ✅ SAFE DRAWER OPEN (TYPE FIXED)
  const openDrawer = () => {
    const parent = navigation.getParent?.() as
      | DrawerNavigationProp<ParamListBase>
      | undefined;

    parent?.openDrawer();
  };

  // ✅ SAFE BACK HANDLER
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.sideIcon}>
          {showBack ? (
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={openDrawer}>
              <Ionicons name="menu" size={26} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>{title}</Text>
        <View style={styles.sideIcon} />
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;
