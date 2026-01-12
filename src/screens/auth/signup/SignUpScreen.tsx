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
import { goBack } from '../../../utils/NavigationUtil';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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

  // ---------------- VALIDATION ----------------
  const validate = (): boolean => {
    let valid = true;

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Full name
    if (!fullName.trim()) {
      setNameError('Full name is required');
      valid = false;
    } else if (fullName.trim().length < 2) {
      setNameError('Enter valid full name');
      valid = false;
    }

    // Email
    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
      valid = false;
    }

    // Password
    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    // Confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password is required');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  // ---------------- SIGN UP ----------------
  const onSignUp = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      // 1️⃣ Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email.trim(),
        password,
      );

      const user = userCredential.user;

      // 2️⃣ Save user data in Firestore
      await firestore()
        .collection('users')
        .doc(user.uid) // 👈 UID as document ID (BEST PRACTICE)
        .set({
          uid: user.uid,
          fullName: fullName.trim(),
          email: email.trim(),
          provider: 'email',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      console.log('✅ User created & data saved in Firestore');

      // 3️⃣ (Optional) Navigate to Home
      // resetAndNavigate('Home');
    } catch (error: any) {
      console.log('❌ Signup error:', error);

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
      <CustomText variant="h2" style={styles.title}>
        Sign Up
      </CustomText>

      {/* FULL NAME */}
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
      />

      {/* EMAIL */}
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

      {/* PASSWORD */}
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

      {/* CONFIRM PASSWORD */}
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
      />

      {/* SIGN UP BUTTON */}
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
      {/* SOCIAL */}
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
