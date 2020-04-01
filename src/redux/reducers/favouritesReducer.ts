import {
  SET_FAVOURITE,
  SET_FAVOURITES,
  REMOVE_FAVOURITE,
} from '../actions/types';
import {Action} from '../../interfaces';

const initialState: Array<object | null> = [];

const favouritesReducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  const actions = {
    [SET_FAVOURITE]() {
      return [...state, payload];
    },
    [SET_FAVOURITES]() {
      return payload;
    },
    [REMOVE_FAVOURITE]() {
      return state.filter(fav => fav.lister_url !== action.payload);
    },
    default() {
      return state;
    },
  };

  return (actions[type] || actions.default)();
};

export default favouritesReducer;
