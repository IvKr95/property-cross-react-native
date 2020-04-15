import * as types from '../actions/types';
import {Action, Listing} from '../../interfaces';

const initialState: Listing[] = [];

const favouritesReducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  const actions = {
    [types.SET_FAVOURITE]() {
      if (state.length) {
        const newState = state.filter(item => item.id !== payload.id);
        return [...newState, payload];
      }
      return [payload];
    },
    [types.REMOVE_FAVOURITE]() {
      if (state.length && payload) {
        return state.filter(item => item.id !== payload);
      }
      return state;
    },
    [types.SET_FAVOURITES]() {
      return payload;
    },
    [types.REMOVE_FAVOURITES]() {
      return initialState;
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default favouritesReducer;
