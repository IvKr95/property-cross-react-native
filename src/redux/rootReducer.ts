import {combineReducers} from 'redux';
import favouritesReducer from './reducers/favouritesReducer';
import listingReducer from './reducers/listingReducer';
import propSearchReducer from './reducers/propSearchReducer';
import searchResultsReducer from './reducers/searchResultsReducer';

export default combineReducers({
  favourites: favouritesReducer,
  listing: listingReducer,
  propSearch: propSearchReducer,
  searchResults: searchResultsReducer,
});
