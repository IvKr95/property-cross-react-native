import {SEARCH_LOCATION} from '../actions/asyncTypes';
import {
  SET_RECENT_SEARCH,
  SET_RECENT_SEARCHES,
  REMOVE_RECENT_SEARCH,
  SET_SEARCH_FIELD,
  SET_ERROR,
} from '../actions/types';
import {Action} from '../../interfaces';

const initialState = {
  isLoading: false,
  location: '',
  recentSearches: [],
  locations: [],
  error: null,
};

const propSearchReducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  const actions = {
    [SET_RECENT_SEARCH]() {
      return {
        ...state,
        recentSearches: [
          payload,
          ...state.recentSearches.filter(rs => rs.id !== payload.id),
        ],
      };
    },
    [SET_RECENT_SEARCHES]() {
      return {
        ...state,
        recentSearches: payload,
      };
    },
    [REMOVE_RECENT_SEARCH]() {
      return {
        ...state,
        recentSearches: state.recentSearches.filter(rs => rs.id !== payload),
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
        locations: payload.locations || [],
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
