import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {nanoid} from 'nanoid/non-secure';
import withAsyncStorage from '../../hocs/withAsyncStorage';
import {searchLocationRequest} from '../../redux/actions/actionCreators';
import {
  setSearchField,
  setSearches,
  getGeolocation,
} from '../../redux/actions/actionCreators';

import {RootState} from '../../interfaces';
import SearchView from './SearchView';

interface Props {
  getData: () => Promise<object[]>;
  setData: (data: object) => void;
  removeItem: (name: string) => void;
}

const SearchContainer: React.FC<Props> = ({getData, setData, removeItem}) => {
  const dispatch = useDispatch();
  const {isLoading, location, recentSearches, locations, error} = useSelector(
    (state: RootState) => state.propSearch,
  );
  const {listings, searchTerm, total} = useSelector(
    (state: RootState) => state.searchResults,
  );
  const firstRun = useRef<boolean>(true);

  useEffect(() => {
    const data = getData();
    data.then(entry => dispatch(setSearches(entry)));
  }, [dispatch, getData, recentSearches]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!isLoading && listings.length) {
      setData({
        id: nanoid(),
        name: searchTerm,
        total,
      });
    }
  }, [isLoading, listings, searchTerm, setData, total]);

  const searchLocation = (by: object) => {
    const action = searchLocationRequest(by);
    dispatch(action);
  };

  const changeInput = (input: string) => {
    const action = setSearchField(input);
    dispatch(action);
  };

  const removeRecentSearch = (name: string) => {
    removeItem(name);
  };

  const getCoords = () => {
    const action = getGeolocation();
    dispatch(action);
  };

  return (
    <SearchView
      recentSearches={recentSearches}
      locations={locations}
      error={error}
      searchLocation={searchLocation}
      changeInput={changeInput}
      location={location}
      isLoading={isLoading}
      removeRecentSearch={removeRecentSearch}
      getCoords={getCoords}
    />
  );
};

export default withAsyncStorage('recent_searches')(SearchContainer);
