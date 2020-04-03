import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Listing} from '../../interfaces';
import ListingItem from './ListingItem';

interface Props {
  isLoading: boolean;
  listings: Listing[];
  goToListing: (listingData: JSON) => void;
  loadMore: () => void;
  currentlyDisplayed: number;
  searchTerm: string;
  total: number;
  error?: string;
}

const Listings: React.FC<Props> = ({
  isLoading,
  listings,
  goToListing,
  loadMore,
  currentlyDisplayed,
  searchTerm,
  total,
  error,
}) => {
  const handlePress = () => {
    loadMore();
  };

  const listHeader = () => (
    <Text>
      {currentlyDisplayed} of {total} matches
    </Text>
  );

  const listFooter = () => (
    <>
      {currentlyDisplayed < total && (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text>Load more</Text>
          )}
        </TouchableOpacity>
      )}
      <Text>
        {error ||
          `Results for ${searchTerm}, showing ${currentlyDisplayed} of ${total} properties`}
      </Text>
    </>
  );

  return (
    <FlatList
      data={listings}
      renderItem={({item}) => (
        <ListingItem listing={item} goToListing={goToListing} />
      )}
      keyExtractor={item => item.id}
      ListHeaderComponent={listHeader()}
      ListFooterComponent={listFooter()}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    marginBottom: 10,
  },
});

export default Listings;
