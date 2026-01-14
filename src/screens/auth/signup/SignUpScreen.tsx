import React, { FC, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import CustomText from '../../../components/global/CustomText';
import CustomInput from '../../../components/global/CustomInput';
import CustomButton from '../../../components/global/CustomButton';
import SocialButtonHorizontal from '../../../components/global/SocialButtonHorizontal';
import styles from './styles';
import { isValidEmail } from '../../../utils/Validators';
import { Colors } from '../../../constants/Colors';
import GoogleIcon from '../../../assets/icons/google.png';
import CustomAuthNav from '../../../components/global/CustomAuthNav';
import { goBack, navigate } from '../../../utils/NavigationUtil';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomLoader from '../../../components/global/CustomLoader';

const SignUpScreen: FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const validate = (): boolean => {
    let valid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!fullName.trim()) {
      setNameError('Full name is required');
      valid = false;
    } else if (fullName.trim().length < 2) {
      setNameError('Enter valid full name');
      valid = false;
    }

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
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password is required');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const onSignUp = async () => {
    if (!validate()) return;
    try {
      setLoading(true);

      // Create the new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email.trim(),
        password,
      );

      const user = userCredential.user;

      // Save user data in Firestore
      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        fullName: fullName.trim(),
        email: email.trim(),
        provider: 'email',
        createdAt: firestore.FieldValue.serverTimestamp(),
        TOTAL_SCORE: 0,
      });

      // Increment the TOTAL_USERS field
      const totalUsersDoc = firestore().collection('users').doc('TOTAL_USERS');

      await firestore().runTransaction(async transaction => {
        const totalUsersDocSnapshot = await transaction.get(totalUsersDoc);

        if (!totalUsersDocSnapshot.exists) {
          // If the TOTAL_USERS document doesn't exist, create it with initial count 1
          transaction.set(totalUsersDoc, { COUNT: 1 });
        } else {
          // If the document exists, increment the COUNT field
          const currentCount = totalUsersDocSnapshot.data()?.COUNT || 0;
          transaction.update(totalUsersDoc, { COUNT: currentCount + 1 });
        }
      });
      console.log('User created & data saved in Firestore');
    } catch (error: any) {
      console.log('Signup error:', error);

      if (error.code === 'auth/email-already-in-use') {
        setEmailError('Email already in use');
      } else if (error.code === 'auth/invalid-email') {
        setEmailError('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        setPasswordError('Password is too weak');
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {loading && <CustomLoader visible={loading} />}

      <CustomText variant="h2" style={styles.title}>
        Sign Up
      </CustomText>

      <CustomInput
        label="Full Name"
        placeholder="Enter full name"
        value={fullName}
        onChangeText={text => {
          setFullName(text);
          if (nameError) setNameError('');
        }}
        leftIcon="person-outline"
        error={nameError}
        containerStyle={styles.input}
        autoCapitalize="none"
      />

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
        autoCapitalize="none"
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
        autoCapitalize="none"
      />

      <CustomInput
        label="Confirm Password"
        placeholder="Re-enter password"
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          if (confirmPasswordError) setConfirmPasswordError('');
        }}
        leftIcon="lock-closed-outline"
        secureTextEntry
        error={confirmPasswordError}
        containerStyle={styles.input}
        autoCapitalize="none"
      />

      <CustomButton
        title="Create Account"
        onPress={onSignUp}
        loading={loading}
        disabled={loading}
        containerStyle={styles.button}
      />
      <CustomAuthNav
        text="Already have an account?"
        actionText="Login"
        onPress={() => goBack()}
      />
      <SocialButtonHorizontal
        icon={<Image source={GoogleIcon} style={styles.gimg} />}
        onPress={() => console.log('Google Signup')}
        text="Continue with Google"
        textColor={Colors.black}
        backgroundColor={Colors.white}
      />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
