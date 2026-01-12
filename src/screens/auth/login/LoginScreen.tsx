import React, { FC, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import CustomText from '../../../components/global/CustomText';
import CustomInput from '../../../components/global/CustomInput';
import CustomButton from '../../../components/global/CustomButton';
import styles from './styles';
import { isValidEmail } from '../../../utils/Validators';
import SocialButtonHorizontal from '../../../components/global/SocialButtonHorizontal';
import { Colors } from '../../../constants/Colors';
import GoogleIcon from '../../../assets/icons/google.png';
import CustomAuthNav from '../../../components/global/CustomAuthNav';
import { navigate } from '../../../utils/NavigationUtil';
const LoginScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const validate = (): boolean => {
    let valid = true;

    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    return valid;
  };

  const onLogin = () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log('LOGIN DATA =>', email, password);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <CustomText variant="h2" style={styles.title}>
        Login
      </CustomText>

      <CustomInput
        label="Email"
        placeholder="Enter email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (emailError) setEmailError('');
        }}
        leftIcon="mail-outline"
        keyboardType="email-address"
        error={emailError}
        containerStyle={styles.input}
      />

      <CustomInput
        label="Password"
        placeholder="Enter password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (passwordError) setPasswordError('');
        }}
        leftIcon="lock-closed-outline"
        secureTextEntry
        error={passwordError}
        containerStyle={styles.input}
      />

      <CustomButton
        title="Login"
        onPress={onLogin}
        loading={loading}
        disabled={loading}
        containerStyle={styles.button}
      />
      <CustomAuthNav
        text="Don’t have an account?"
        actionText="Sign Up"
        onPress={() => navigate('SignUp')}
      />
      <SocialButtonHorizontal
        icon={<Image source={GoogleIcon} style={styles.gimg} />}
        onPress={() => {}}
        text="Continue with Google"
        textColor="#000"
        backgroundColor={Colors.white}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
