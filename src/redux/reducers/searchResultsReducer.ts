import {SEARCH_LOCATION} from '../actions/asyncTypes';
import {Action} from '../../interfaces';

const initialState = {
  searchTerm: '',
  page: 0,
  currentlyDisplayed: 0,
  total: 0,
  listings: [],
};

const searchResultsReducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  const actions = {
    [SEARCH_LOCATION.SUCCESS]() {
      const listings = payload.listings;

      if (!listings) {
        return state;
      }
      return {
        ...state,
        ...listings,
        currentlyDisplayed:
          state.currentlyDisplayed + listings.currentlyDisplayed,
        listings: state.listings.concat(listings.listings),
      };
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default searchResultsReducer;
