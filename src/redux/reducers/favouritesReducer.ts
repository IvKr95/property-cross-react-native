import {
  SET_FAVOURITE,
  SET_FAVOURITES,
  REMOVE_FAVOURITE,
  REMOVE_FAVOURITES,
} from '../actions/types';
import {Action, Listing} from '../../interfaces';

const initialState: Listing[] = [];

const favouritesReducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  const actions = {
    [SET_FAVOURITE]() {
      if (state.length) {
        const newState = state.filter(item => item.id !== payload.id);
        return [...newState, payload];
      }
      return [payload];
    },
    [REMOVE_FAVOURITE]() {
      if (state.length && payload) {
        return state.filter(item => item.id !== payload);
      }
      return state;
    },
    [SET_FAVOURITES]() {
      return payload;
    },
    [REMOVE_FAVOURITES]() {
      return initialState;
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default favouritesReducer;
