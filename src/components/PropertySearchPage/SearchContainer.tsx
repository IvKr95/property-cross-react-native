import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import withAsyncStorage from '../../hocs/withAsyncStorage';
import withGeolocation from '../../hocs/withGeolocation';
import SearchView from './SearchView';
import {searchLocation} from '../../redux/actions/asyncActionCreators';
import {setSearchField, setSearches} from '../../redux/actions/actionCreators';
import {RootState} from '../../interfaces';

interface Props {
  getData: () => Promise<object[]>;
  setData: (data: object) => void;
  searchByLocation: () => void;
}

const SearchContainer: React.FC<Props> = ({
  getData,
  setData,
  searchByLocation,
}) => {
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
        name: searchTerm,
        total,
      });
    }
  }, [isLoading, listings, searchTerm, setData, total]);

  const searchLoc = (by: object) => {
    const action = searchLocation(by);
    dispatch(action);
  };

  const changeInput = (input: string) => {
    dispatch(setSearchField(input));
  };

  return (
    <SearchView
      recentSearches={recentSearches}
      locations={locations}
      error={error}
      searchLocation={searchLoc}
      changeInput={changeInput}
      location={location}
      isLoading={isLoading}
      searchByLocation={searchByLocation}
    />
  );
};

export default withAsyncStorage('recent_searches')(
  withGeolocation(SearchContainer),
);
