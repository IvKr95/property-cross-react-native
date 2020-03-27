import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setListing, setFavourites} from '../../redux/actions/actionCreators';
import withAsyncStorage from '../../hocs/withAsyncStorage';
import FavouritesView from './FavouritesView';
// import Listings from './Listings';

const FavouritesContainer = ({getEntry}) => {
  //   const favourites = useSelector(state => state.favourites);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     const entry = getEntry();
  //     dispatch(setFavourites(entry));
  //   }, [dispatch, getEntry]);

  //   const handleClick = event => {
  //     const {about} = event.currentTarget.dataset;
  //     dispatch(setListing(about));
  //   };

  return <FavouritesView />;
};

export default withAsyncStorage('favourites')(FavouritesContainer);
