import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

interface RecentSearch {
  name: string;
  total: number;
}

interface Props {
  recentSearches: Array<RecentSearch>;
  searchLocation: (placeName: object) => void;
}

const RecentSearches: React.FC<Props> = ({recentSearches, searchLocation}) => {
  const handlePress = (name: string) => {
    searchLocation({place_name: name});
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
});

export default RecentSearches;
