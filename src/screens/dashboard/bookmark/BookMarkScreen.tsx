import React from 'react';
import { View, Text, FlatList } from 'react-native';
import CustomHeader from '../../../components/global/CustomHeader';
import { useBookmarks } from '../../../context/BookMarkContext';
import styles from './styles';
import BookMarksItem from '../../../components/list/BookMarksItem';

const BookMarkScreen = ({ navigation }: any) => {
  const { bookmarks } = useBookmarks();
  return (
    <View style={styles.container}>
      <CustomHeader title="BookMark" navigation={navigation} showBack />

      {bookmarks.length === 0 ? (
        <View
          style={styles.bookMarkContainer}
        >
          <Text style={styles.bookMarkTitle}>
            No Bookmarked Questions
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <BookMarksItem item={item} index={index} />
          )}
        />
      )}
    </View>
  );
};

export default BookMarkScreen;
