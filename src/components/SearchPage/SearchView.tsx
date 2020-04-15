import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SearchPage} from '../../interfaces';
import RecentSearches from './RecentSearches';
import Locations from './Locations';
import SearchForm from './SearchForm';

interface Props extends SearchPage {
  searchLocation: (placeName: {place_name: string}) => void;
  removeRecentSearch: (id: string) => void;
  changeInput: (input: string) => void;
  getCoords: () => void;
}

const SearchView: React.FC<Props> = ({
  searchLocation,
  changeInput,
  location,
  isLoading,
  recentSearches,
  locations,
  error,
  removeRecentSearch,
  getCoords,
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
    } else if (locations.length) {
      return <Locations locations={locations} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <SearchForm
        searchLocation={searchLocation}
        getCoords={getCoords}
        changeInput={changeInput}
        location={location}
        isLoading={isLoading}
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
