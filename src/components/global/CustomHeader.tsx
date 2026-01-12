import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './CustomHeader.styles';
import { Colors } from '../../constants/Colors';

const CustomHeader = ({
  title,
  navigation,
  showBack,
}: {
  title: string;
  navigation: any;
  showBack: boolean;
}) => {
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={26} color={Colors.white} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
};

export default CustomHeader;
