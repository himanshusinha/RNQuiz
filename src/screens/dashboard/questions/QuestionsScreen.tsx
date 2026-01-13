import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../../components/global/CustomHeader';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔵 Quiz Top Bar */}
      <View style={styles.topHeader}>
        <Text style={styles.count}>1/25</Text>
        <Text style={styles.timer}>20 : 15 min</Text>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>

      {/* Subject */}
      <View style={styles.subjectBar}>
        <Text style={styles.subjectText}>GK</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            height: 180,
            marginBottom: 20,
          }}
        >
          <Text style={styles.question}>
            Who is the Prime Minister of India?
          </Text>
        </View>
        {['Narendra Modi', 'Rahul Gandhi', 'Amit Shah', 'Arvind Kejriwal'].map(
          (opt, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <View style={styles.radio} />
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.navText}>{'<'}</Text>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>CLEAR SELECTION</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>MARK FOR REVIEW</Text>
        </TouchableOpacity>

        <Text style={styles.navText}>{'>'}</Text>
      </View>
    </SafeAreaView>
  );
};
export default QuizScreen;
