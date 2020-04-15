import {combineReducers} from 'redux';
import favouritesReducer from './reducers/favouritesReducer';
import listingReducer from './reducers/listingReducer';
import propSearchReducer from './reducers/searchReducer';
import searchResultsReducer from './reducers/resultsReducer';

export default combineReducers({
  favouritesPage: favouritesReducer,
  listingPage: listingReducer,
  searchPage: propSearchReducer,
  resultsPage: searchResultsReducer,
});
