import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import RecentSearches from './RecentSearches';
import Locations from './Locations';

interface RecentSearch {
  name: string;
  total: number;
}

interface Location {
  name: string;
  props: number;
}

interface Props {
  recentSearches: Array<RecentSearch>;
  searchLocation: (placeName: object) => void;
  changeInput: (input: string) => void;
  location: string;
  isLoading: boolean;
  locations: Array<Location> | null;
  error: null | object | string;
  searchByLocation: () => void;
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
}) => {
  const handleSubmit = () => {
    searchLocation({place_name: location});
  };

  const handlePress = () => {
    searchByLocation();
  };

  const handleChange = (input: string) => {
    changeInput(input);
  };

  const errorSlot = () => {
    return <Text>{error}</Text>;
  };

  const listSlot = () => {
    if (recentSearches.length) {
      return (
        <RecentSearches
          recentSearches={recentSearches}
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
      <View style={styles.form}>
        <Text style={styles.heading}>
          Use the form below to search for houses to buy
        </Text>
        <TextInput
          placeholder="Edinburgh"
          onChangeText={handleChange}
          value={location}
          style={styles.input}
        />
        <Text style={styles.hint}>
          You can search by place-name, postcode, or click &lsquo;My
          location&rsquo;, to search in your current location!
        </Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text>Go</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text>My location</Text>
        </TouchableOpacity>
      </View>
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
  form: {},
  heading: {
    fontSize: 26,
  },
  hint: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
    marginVertical: 5,
  },
  input: {
    fontSize: 26,
    borderBottomWidth: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    marginBottom: 10,
  },
});

export default SearchView;
