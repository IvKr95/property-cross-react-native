import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFavourites} from '../../redux/actions/actionCreators';
import withAsyncStorage from '../../hocs/withAsyncStorage';
import {RootState, Listing, Navigation} from '../../interfaces';
import FavouritesView from './FavouritesView';

interface Props {
  getData: () => Promise<Listing[]>;
  navigation: Navigation;
}

const FavouritesContainer: React.FC<Props> = ({getData, navigation}) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favouritesPage);

  useEffect(() => {
    const data = getData();
    data.then(items => dispatch(setFavourites(items)));
  }, [dispatch, getData]);

  const goToListing = (data: Listing) => {
    navigation.navigate('ListingPage', {listing: data});
  };

  return <FavouritesView favourites={favourites} goToListing={goToListing} />;
};

export default withAsyncStorage('favourites')(FavouritesContainer);
