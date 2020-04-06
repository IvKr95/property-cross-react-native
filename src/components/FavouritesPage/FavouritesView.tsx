import React from 'react';
import {FlatList} from 'react-native';
import ListingItem from '../SharedComponents/ListingItem';
import {Listing} from '../../interfaces';

interface Props {
  favourites: Listing[];
  goToListing: (data: JSON) => void;
}

const FavouritesView: React.FC<Props> = ({favourites, goToListing}) => {
  return (
    <FlatList
      data={favourites}
      renderItem={({item}) => (
        <ListingItem listing={item} goToListing={goToListing} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default FavouritesView;
