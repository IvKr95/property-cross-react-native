import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SearchPage} from '../../interfaces';

interface Props extends SearchPage {
  searchLocation: (placeName: {place_name: string}) => void;
  changeInput: (input: string) => void;
  getCoords: () => void;
}

const SearchForm: React.FC<Props> = ({
  searchLocation,
  getCoords,
  changeInput,
  isLoading,
  location,
}) => {
  const handleSubmit = () => {
    searchLocation({place_name: location});
  };

  const handlePress = () => {
    getCoords();
  };

  const handleChange = (input: string) => {
    changeInput(input);
  };

  return (
    <View>
      <Text style={styles.heading}>
        Use the form below to search for houses to buy
      </Text>
      <TextInput
        value={location}
        style={styles.input}
        placeholder="Edinburgh"
        onChangeText={handleChange}
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
  );
};

const styles = StyleSheet.create({
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

export default SearchForm;
