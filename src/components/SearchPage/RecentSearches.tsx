import React from 'react';
import {Text, FlatList} from 'react-native';
import {RecentSearch} from '../../interfaces';
import RecentSearchItem from './RecentSearchItem';

interface Props {
  recentSearches: RecentSearch[];
  removeRecentSearch: (id: string) => void;
  searchLocation: (placeName: {place_name: string}) => void;
}

const listHeader = <Text>Recent Searches:</Text>;

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
      ListHeaderComponent={listHeader}
    />
  );
};

export default RecentSearches;
