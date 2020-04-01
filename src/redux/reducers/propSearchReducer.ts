import {SEARCH_LOCATION} from '../actions/asyncTypes';
import {
  SET_RECENT_SEARCHES,
  REMOVE_RECENT_SEARCHES,
  SET_SEARCH_FIELD,
  SET_ERROR,
} from '../actions/types';
import {Action} from '../../interfaces';

const initialState = {
  isLoading: false,
  location: '',
  recentSearches: [],
  locations: null,
  error: null,
};

const propSearchReducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  const actions = {
    [SET_RECENT_SEARCHES]() {
      return {
        ...state,
        recentSearches: payload,
      };
    },
    [REMOVE_RECENT_SEARCHES]() {
      return {
        ...state,
        recentSearches: [],
      };
    },
    [SET_SEARCH_FIELD]() {
      return {
        ...state,
        location: payload,
      };
    },
    [SET_ERROR]() {
      return {
        ...state,
        error: payload,
      };
    },
    [SEARCH_LOCATION.REQUEST]() {
      return {
        ...state,
        isLoading: true,
      };
    },
    [SEARCH_LOCATION.SUCCESS]() {
      return {
        ...state,
        error: null,
        isLoading: false,
        location: '',
        locations: payload.locations || null,
      };
    },
    [SEARCH_LOCATION.FAILURE]() {
      return {
        ...state,
        location: '',
        isLoading: false,
        error: payload,
      };
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default propSearchReducer;
