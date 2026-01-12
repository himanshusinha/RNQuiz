import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';

interface Props {
  text: string;
  actionText: string;
  onPress: () => void;
}

const CustomAuthNav: FC<Props> = ({ text, actionText, onPress }) => {
  return (
    <View style={styles.container}>
      <CustomText variant="h8" style={styles.text}>
        {text}{' '}
      </CustomText>

      <TouchableOpacity onPress={onPress}>
        <CustomText
          variant="h8"
          fontFamily={FONTS.Medium}
          style={styles.actionText}
        >
          {actionText}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  text: {
    color: Colors.gray,
  },
  actionText: {
    color: Colors.black,
  },
});

export default CustomAuthNav;
