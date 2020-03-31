import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RecentSearch, Location} from '../../interfaces';
import RecentSearches from './RecentSearches';
import Locations from './Locations';
import SearchForm from './SearchForm';

interface Props {
  recentSearches: RecentSearch[];
  searchLocation: (placeName: object) => void;
  changeInput: (input: string) => void;
  location: string;
  isLoading: boolean;
  locations: Location[] | null;
  error: null | object | string;
  searchByLocation: () => void;
  removeRecentSearch: (name: string) => void;
}

const SearchView: React.FC<Props> = ({
  searchLocation,
  changeInput,
  location,
  isLoading,
  recentSearches,
  locations,
  error,
  searchByLocation,
  removeRecentSearch,
}) => {
  const errorSlot = () => {
    return <Text>{error}</Text>;
  };

  const listSlot = () => {
    if (recentSearches.length) {
      return (
        <RecentSearches
          recentSearches={recentSearches}
          removeRecentSearch={removeRecentSearch}
          searchLocation={searchLocation}
        />
      );
    } else if (locations && locations.length) {
      return <Locations locations={locations} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <SearchForm
        searchLocation={searchLocation}
        changeInput={changeInput}
        location={location}
        isLoading={isLoading}
        searchByLocation={searchByLocation}
      />
      {(error ? errorSlot : listSlot)()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default SearchView;
