import React, { FC, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import CustomText from './CustomText';

interface Props {
  label?: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'number-pad' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  leftIcon?: string; // 👈 Ionicons name
}

const CustomInput: FC<Props> = ({
  label,
  value,
  placeholder,
  onChangeText,
  containerStyle,
  inputStyle,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  editable = true,
  leftIcon,
}) => {
  const [focused, setFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <View style={containerStyle}>
      {label && (
        <CustomText variant="h6" style={styles.label}>
          {label}
        </CustomText>
      )}

      <View
        style={[
          styles.inputContainer,
          focused && styles.focused,
          error && styles.errorBorder,
        ]}
      >
        {/* LEFT ICON */}
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={focused ? Colors.black : Colors.gray}
            style={styles.leftIcon}
          />
        )}

        {/* INPUT */}
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="gray"
          onChangeText={onChangeText}
          secureTextEntry={hidePassword}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          style={[styles.input, multiline && styles.multiline, inputStyle]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {/* RIGHT EYE ICON */}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <CustomText variant="h8" style={styles.errorText}>
          {error}
        </CustomText>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    color: Colors.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
  },
  focused: {
    borderColor: Colors.black,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: RFValue(12),
    fontFamily: FONTS.Regular,
    color: Colors.black,
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  multiline: {
    height: 'auto',
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  eyeIcon: {
    paddingLeft: 8,
  },
  errorText: {
    marginTop: 4,
    color: Colors.error,
  },
});

export default CustomInput;
