import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RecentSearchModel from '../../models/RecentSearchModel';
import withAsyncStorage from '../../hocs/withAsyncStorage';
import {
  setSearch,
  setSearches,
  removeSearch,
  setSearchField,
  getGeolocation,
  searchLocationRequest,
} from '../../redux/actions/actionCreators';
import {RootState, Navigation, RecentSearch} from '../../interfaces';
import SearchView from './SearchView';

interface Props {
  getData: () => Promise<RecentSearch[]>;
  setData: (data: RecentSearch) => Promise<void | undefined>;
  removeItem: (name: string) => Promise<void>;
  navigation: Navigation;
}

const SearchContainer: React.FC<Props> = ({
  getData,
  setData,
  removeItem,
  navigation,
}) => {
  const dispatch = useDispatch();
  const {isLoading, location, recentSearches, locations, error} = useSelector(
    (state: RootState) => state.searchPage,
  );
  const {listings, searchTerm, total, currentlyDisplayed} = useSelector(
    (state: RootState) => state.resultsPage,
  );
  const firstRun = useRef<boolean>(true);

  useEffect(() => {
    const data = getData();
    data.then(entry => dispatch(setSearches(entry)));
  }, [dispatch, getData]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!isLoading && listings.length) {
      const recentSearchInstance: RecentSearch = new RecentSearchModel(
        searchTerm,
        total,
      );

      setData(recentSearchInstance);
      const action = setSearch(recentSearchInstance);
      dispatch(action);

      navigation.navigate('ResultsPage');
    }
  }, [
    dispatch,
    isLoading,
    listings.length,
    navigation,
    searchTerm,
    setData,
    total,
  ]);

  const searchLocation = (by: {place_name: string}) => {
    if (
      currentlyDisplayed &&
      currentlyDisplayed === total &&
      searchTerm === by.place_name
    ) {
      navigation.navigate('ResultsPage');
      return;
    }
    const action = searchLocationRequest(by);
    dispatch(action);
  };

  const changeInput = (input: string) => {
    const action = setSearchField(input);
    dispatch(action);
  };

  const removeRecentSearch = (id: string) => {
    const action = removeSearch(id);
    dispatch(action);
    removeItem(id);
  };

  const getCoords = () => {
    const action = getGeolocation();
    dispatch(action);
  };

  return (
    <SearchView
      error={error}
      location={location}
      isLoading={isLoading}
      locations={locations}
      recentSearches={recentSearches}
      removeRecentSearch={removeRecentSearch}
      searchLocation={searchLocation}
      changeInput={changeInput}
      getCoords={getCoords}
    />
  );
};

export default withAsyncStorage('recent_searches')(SearchContainer);
