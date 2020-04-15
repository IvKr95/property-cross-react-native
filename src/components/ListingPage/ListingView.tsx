import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {ListingPage} from '../../interfaces';

interface Props extends ListingPage {
  handleFavouriteState: () => void;
}

const ListingView: React.FC<Props> = ({
  handleFavouriteState,
  isFavourite,
  listing,
}) => {
  const {
    price_formatted,
    title,
    img_url,
    bedroom_number,
    bathroom_number,
    summary,
  } = listing;

  const handlePress = () => {
    handleFavouriteState();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Property Details</Text>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.favouriteToggleButton}>
        <Text>{isFavourite ? '\u2713' : '\u002B'}</Text>
      </TouchableOpacity>
      <Text>{title}</Text>
      <Image source={{uri: img_url}} style={styles.image} />

      <View style={styles.container}>
        <Text>Price: {price_formatted}</Text>
        <Text>Bedrooms: {bedroom_number}</Text>
        <Text>Bathrooms: {!bathroom_number ? 'no' : bathroom_number}</Text>
        <Text>Summary: {summary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  heading: {
    fontSize: 21,
    textAlign: 'center',
  },
  favouriteToggleButton: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    flex: 1,
  },
});

export default ListingView;
