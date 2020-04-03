import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {RecentSearch} from '../../interfaces';
import RecentSearchItem from './RecentSearchItem';

interface Props {
  recentSearches: RecentSearch[];
  removeRecentSearch: (id: string) => void;
  searchLocation: (placeName: object) => void;
}

const RecentSearches: React.FC<Props> = ({
  recentSearches,
  searchLocation,
  removeRecentSearch,
}) => {
  return (
    <FlatList
      data={recentSearches}
      renderItem={({item}) => (
        <RecentSearchItem
          recentSearch={item}
          searchLocation={searchLocation}
          removeRecentSearch={removeRecentSearch}
        />
      )}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <Text>Recent Searches:</Text>}
    />
  );
};

export default RecentSearches;
