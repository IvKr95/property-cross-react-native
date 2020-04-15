import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, Navigation, Listing} from '../../interfaces';
import {searchLocationRequest} from '../../redux/actions/actionCreators';
import ResultsView from './ResultsView';

interface Props {
  navigation: Navigation;
}

const ResultsContainer: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    page,
    total,
    listings,
    searchTerm,
    currentlyDisplayed,
  } = useSelector((state: RootState) => state.resultsPage);

  useEffect(() => {
    return () => {
      dispatch({type: 'CLEAR_RESULTS_PAGE'});
    };
  }, [dispatch]);

  const goToListing = (item: Listing) => {
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
      error={error}
      total={total}
      listings={listings}
      isLoading={isLoading}
      searchTerm={searchTerm}
      currentlyDisplayed={currentlyDisplayed}
      loadMore={loadMore}
      goToListing={goToListing}
    />
  );
};

export default ResultsContainer;
