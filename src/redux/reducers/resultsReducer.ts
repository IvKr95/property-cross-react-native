import {SEARCH_LOCATION} from '../actions/asyncTypes';
import {Action} from '../../interfaces';

const initialState = {
  searchTerm: '',
  page: 0,
  currentlyDisplayed: 0,
  total: 0,
  listings: [],
  isLoading: false,
  error: null,
};

const searchResultsReducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  const actions = {
    [SEARCH_LOCATION.REQUEST]() {
      return {
        ...state,
        isLoading: true,
      };
    },
    [SEARCH_LOCATION.SUCCESS]() {
      const listings = payload.listings;

      if (!listings) {
        return state;
      }

      if (state.searchTerm !== listings.searchTerm) {
        return {
          ...state,
          ...listings,
          isLoading: false,
          error: null,
          currentlyDisplayed: listings.currentlyDisplayed,
          listings: listings.listings,
        };
      }
      return {
        ...state,
        ...listings,
        isLoading: false,
        error: null,
        currentlyDisplayed:
          state.currentlyDisplayed + listings.currentlyDisplayed,
        listings: state.listings.concat(listings.listings),
      };
    },
    [SEARCH_LOCATION.FAILURE]() {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    },
    ['CLEAR_RESULTS_PAGE']() {
      return initialState;
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default searchResultsReducer;
