import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {RecentSearch} from '../../interfaces';

interface Props {
  recentSearches: RecentSearch[];
  removeRecentSearch: (name: string) => void;
  searchLocation: (placeName: object) => void;
}

const RecentSearches: React.FC<Props> = ({
  recentSearches,
  searchLocation,
  removeRecentSearch,
}) => {
  const handlePress = (name: string) => {
    searchLocation({place_name: name});
  };

  const handleRemove = (name: string) => {
    removeRecentSearch(name);
  };

  return (
    <View>
      <FlatList
        data={recentSearches}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item.name)}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.total}</Text>
            <TouchableOpacity
              onPress={() => handleRemove(item.name)}
              style={styles.deleteButton}>
              <Text>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
        ListHeaderComponent={() => <Text>Recent Searches:</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default RecentSearches;
