import React from 'react';
import { View, Text, FlatList } from 'react-native';
import CustomHeader from '../../../components/global/CustomHeader';
import { useBookmarks } from '../../../context/BookMarkContext';
import styles from './styles';

const BookMarkScreen = ({ navigation }: any) => {
  const { bookmarks } = useBookmarks();

  return (
    <View style={styles.container}>
      <CustomHeader title="BookMark" navigation={navigation} showBack />

      {bookmarks.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100,
          }}
        >
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No Bookmarked Questions
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              {/* ✅ Question number and marked badge */}
              <Text style={styles.qNo}></Text>
              {item.marked && (
                <View style={styles.markedBadge}>
                  <Text style={styles.markedText}>MARKED</Text>
                </View>
              )}

              {/* ✅ Question text */}
              <Text style={styles.question}>
                Q {index + 1} {item.QUESTION}
              </Text>

              {/* ✅ Options */}
              {item.A && (
                <View style={styles.option}>
                  <Text style={styles.optionText}>A. {item.A}</Text>
                </View>
              )}
              {item.B && (
                <View style={styles.option}>
                  <Text style={styles.optionText}>B. {item.B}</Text>
                </View>
              )}
              {item.C && (
                <View style={styles.option}>
                  <Text style={styles.optionText}>C. {item.C}</Text>
                </View>
              )}
              {item.D && (
                <View style={styles.option}>
                  <Text style={styles.optionText}>D. {item.D}</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default BookMarkScreen;
