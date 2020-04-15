import React from 'react';
import {TouchableHighlight, View, Image, Text, StyleSheet} from 'react-native';
import {Listing} from '../../interfaces';

interface Props {
  listing: Listing;
  goToListing: (data: Listing) => void;
}

const ListingItem: React.FC<Props> = ({listing, goToListing}) => {
  const handlePress = (data: Listing) => {
    goToListing(data);
  };

  return (
    <TouchableHighlight onPress={() => handlePress(listing)}>
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{uri: listing.img_url}} />
        </View>
        <View>
          <Text>{listing.title}</Text>
          <Text>{listing.price_formatted}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ListingItem;
