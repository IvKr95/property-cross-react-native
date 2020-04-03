import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFavourites} from '../../redux/actions/actionCreators';
import withAsyncStorage from '../../hocs/withAsyncStorage';
import FavouritesView from './FavouritesView';
// import Listings from './Listings';

const FavouritesContainer = ({getData}) => {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.favourites);

  useEffect(() => {
    const data = getData();
    data.then(items => dispatch(setFavourites(items)));
  }, [dispatch, getData]);

  const addToFavourites = () => {};

  return <FavouritesView />;
};

export default withAsyncStorage('favourites')(FavouritesContainer);
