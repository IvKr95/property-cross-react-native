import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RecentSearch} from '../../interfaces';

interface Props {
  searchLocation: (location: {place_name: string}) => void;
  removeRecentSearch: (id: string) => void;
  recentSearch: RecentSearch;
}

const RecentSearchItem: React.FC<Props> = ({
  searchLocation,
  removeRecentSearch,
  recentSearch,
}) => {
  const handlePress = (name: string) => {
    searchLocation({place_name: name});
  };

  const handleRemove = (id: string) => {
    removeRecentSearch(id);
  };

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handlePress(recentSearch.name)}>
      <Text style={styles.title}>{recentSearch.name}</Text>
      <Text>{recentSearch.total}</Text>
      <TouchableOpacity
        onPress={() => handleRemove(recentSearch.id)}
        style={styles.deleteButton}>
        <Text>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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

export default RecentSearchItem;
