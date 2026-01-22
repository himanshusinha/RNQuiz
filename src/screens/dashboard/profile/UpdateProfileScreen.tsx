import React, { FC, useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomHeader from '../../../components/global/CustomHeader';
import CustomInput from '../../../components/global/CustomInput';
import CustomButton from '../../../components/global/CustomButton';
import CustomLoader from '../../../components/global/CustomLoader';
import { isValidEmail } from '../../../utils/Validators';
import styles from '../score/styles';

const UpdateProfileScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const user = auth().currentUser;
  console.log(user?.displayName, '.....displayName');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  /** Fetch user data */
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const doc = await firestore().collection('users').doc(user.uid).get();
      if (doc.exists()) {
        const data = doc.data();
        setFullName(data?.fullName || user.displayName || '');
        setEmail(data?.email || user.email || '');
      } else {
        setFullName(user.displayName || '');
        setEmail(user.email || '');
      }
    };

    fetchProfile();
  }, [user]);

  /** Validation */
  const validate = (): boolean => {
    let valid = true;
    setNameError('');
    setEmailError('');

    if (!fullName.trim()) {
      setNameError('Full name is required');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
      valid = false;
    }

    return valid;
  };

  /** Update Profile */
  const onUpdateProfile = async () => {
    if (!user || !validate()) return;
    const isGoogleUser =
      user?.providerData?.some(
        provider => provider.providerId === 'google.com',
      ) ?? false;

    setLoading(true);

    try {
      if (!isGoogleUser && email !== user.email) {
        await user.updateEmail(email);
      }
      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          fullName,
          email: isGoogleUser ? user.email : email,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        Alert.alert(
          'Session Expired',
          'Please log in again to update your email.',
        );
      } else {
        Alert.alert('Error', 'Failed to update profile');
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
      <CustomHeader title="Edit Profile" navigation={navigation} showBack />

      {loading && <CustomLoader visible={loading} />}

      <View style={styles.inputStyle}>
        <CustomInput
          label="Full Name"
          placeholder="Enter full name"
          value={fullName}
          onChangeText={text => {
            setFullName(text);
            if (nameError) setNameError('');
          }}
          error={nameError}
        />

        <CustomInput
          containerStyle={{ marginVertical: 10 }}
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

        <CustomButton
          title="Update Profile"
          onPress={onUpdateProfile}
          loading={loading}
          disabled={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfileScreen;
