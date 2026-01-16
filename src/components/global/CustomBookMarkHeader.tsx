import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

type CustomBookMarkHeaderProps = {
  onMenuPress?: () => void;
  title: string;
  isBookmarked: boolean;
  onBookmarkPress: () => void;
};

const CustomBookMarkHeader: React.FC<CustomBookMarkHeaderProps> = ({
  onMenuPress,
  title,
  isBookmarked,
  onBookmarkPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onBookmarkPress} style={styles.left}>
        <Icon
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={Colors.white}
          style={{ marginRight: 6 }}
        />
      </TouchableOpacity>

      {/* RIGHT */}
      <TouchableOpacity onPress={onMenuPress} style={styles.iconBtn}>
        <Image
          source={require('../../assets/icons/dots_menu.png')}
          style={styles.menuIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.navyBlue,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBtn: {
    padding: 6,
  },

  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  menuIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.white,
  },
});

export default CustomBookMarkHeader;
