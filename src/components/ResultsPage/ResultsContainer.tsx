import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setListing,
  searchLocationRequest,
} from '../../redux/actions/actionCreators';
import ResultsView from './ResultsView';

const ResultsContainer = ({navigation}) => {
  const dispatch = useDispatch();
  const {page, total, listings, searchTerm, currentlyDisplayed} = useSelector(
    state => state.searchResults,
  );
  const {isLoading, error} = useSelector(state => state.propSearch);

  const goToListing = (item: JSON) => {
    navigation.navigate('ListingPage', {listing: item});
  };

  const loadMore = () => {
    const action = searchLocationRequest({
      page: page + 1,
      place_name: searchTerm,
    });
    dispatch(action);
  };

  return (
    <ResultsView
      isLoading={isLoading}
      error={error}
      goToListing={goToListing}
      loadMore={loadMore}
      currentlyDisplayed={currentlyDisplayed}
      total={total}
      listings={listings}
      searchTerm={searchTerm}
    />
  );
};

export default ResultsContainer;
