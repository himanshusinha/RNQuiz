import React, { FC, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import CustomText from '../../../components/global/CustomText';
import CustomInput from '../../../components/global/CustomInput';
import CustomButton from '../../../components/global/CustomButton';
import SocialButtonHorizontal from '../../../components/global/SocialButtonHorizontal';
import CustomAuthNav from '../../../components/global/CustomAuthNav';

import styles from './styles';
import { isValidEmail } from '../../../utils/Validators';
import { Colors } from '../../../constants/Colors';
import GoogleIcon from '../../../assets/icons/google.png';

import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { RootStackParamList } from '../../../types/types';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '987643366374-bq7cjrf0347s9gpfko0gd5r4s61d5ico.apps.googleusercontent.com',
    });
  }, []);

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
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    return valid;
  };

  const onLogin = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await auth().signInWithEmailAndPassword(
        email.trim(),
        password,
      );
      const uid = res.user.uid;
      const userDoc = await firestore().collection('users').doc(uid).get();
      if (!userDoc.exists) {
        await auth().signOut();
        Alert.alert('Error', 'User record not found. Please sign up.');
        return;
      }
    } catch (error: any) {
      console.log('LOGIN ERROR:', error.code);
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password'
      ) {
        setPasswordError('Invalid email or password');
      } else if (error.code === 'auth/user-not-found') {
        setEmailError('User not found');
      } else {
        Alert.alert('Login failed', 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();
      if (!userInfo.data) {
        throw new Error('No user data returned from Google');
      }
      const idToken = userInfo.data.idToken;
      if (!idToken) {
        throw new Error('No ID token returned from Google');
      }
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);
      const uid = res.user.uid;
      const userRef = firestore().collection('users').doc(uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        await userRef.set({
          uid,
          email: res.user.email,
          fullName: res.user.displayName,
          provider: 'google',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.log('GOOGLE SIGN-IN ERROR:', error);
    }
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
        keyboardType="email-address"
        autoCapitalize="none"
        error={emailError}
      />

      <CustomInput
        containerStyle={{ marginVertical: 10 }}
        label="Password"
        placeholder="Enter password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (passwordError) setPasswordError('');
        }}
        secureTextEntry
        error={passwordError}
      />

      <CustomButton
        title="Login"
        onPress={onLogin}
        loading={loading}
        disabled={loading}
      />

      <CustomAuthNav
        text="Don’t have an account?"
        actionText="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />

      <SocialButtonHorizontal
        icon={<Image source={GoogleIcon} style={styles.gimg} />}
        onPress={googleSignIn}
        text="Continue with Google"
        textColor="#000"
        backgroundColor={Colors.white}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
