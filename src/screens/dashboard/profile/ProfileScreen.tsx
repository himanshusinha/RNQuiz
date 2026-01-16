import { View, Text } from 'react-native';
import React from 'react';
import CustomHeader from '../../../components/global/CustomHeader';
import styles from '../score/styles';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Edit Profile" navigation={navigation} showBack />
    </View>
  );
};

export default ProfileScreen;
