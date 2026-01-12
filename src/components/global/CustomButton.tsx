import React, { FC } from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  backgroundColor?: string;
}

const CustomButton: FC<Props> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  containerStyle,
  textStyle,
  backgroundColor = Colors.blue,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor },
        disabled && styles.disabled,
        containerStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: Colors.white,
    fontSize: RFValue(14),
    fontFamily: FONTS.Medium,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default CustomButton;
