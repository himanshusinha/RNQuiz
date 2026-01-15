import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { COLORS, QuestionPaletteItem, QuestionStatus } from '../../types/types';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.78;

interface PaletteItem {
  questionNo: number;
  status: QuestionStatus;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  palette: QuestionPaletteItem[];
  onSelectQuestion?: (qNo: number) => void;
}

const QuestionPaletteModal: React.FC<Props> = ({
  visible,
  onClose,
  palette,
  onSelectQuestion,
}) => {
  const translateX = useRef(new Animated.Value(MODAL_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : MODAL_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const renderLegend = (label: string, color: string) => (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );

  return (
    <Modal transparent visible={visible} animationType="none">
      <SafeAreaView style={{ flex: 1 }}>
        {/* Overlay */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={styles.overlay}
        />

        {/* Drawer */}
        <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
          {/* Header */}
          <TouchableOpacity
            style={{ marginTop: 50 }}
            onPress={onClose}
            hitSlop={10}
          >
            <Icon name="close" size={26} color={Colors.error} />
          </TouchableOpacity>
          {/* Legend */}
          <View style={styles.legendContainer}>
            {renderLegend('Answered', COLORS.answered)}
            {renderLegend('Unanswered', COLORS.notAnswered)}
            {renderLegend('Marked', COLORS.markedForReview)}
            {renderLegend('Not Visited', COLORS.notVisited)}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Questions Grid */}
          <FlatList
            data={palette}
            numColumns={5}
            keyExtractor={item => item.questionNo.toString()}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelectQuestion?.(item.questionNo);
                  onClose();
                }}
                style={[
                  styles.circle,
                  { backgroundColor: COLORS[item.status] },
                ]}
              >
                <Text style={styles.circleText}>{item.questionNo}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

export default QuestionPaletteModal;
