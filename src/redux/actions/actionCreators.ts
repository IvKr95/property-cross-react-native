import {
  SET_RECENT_SEARCH,
  SET_RECENT_SEARCHES,
  REMOVE_RECENT_SEARCH,
  SET_SEARCH_FIELD,
  SET_ERROR,
  SET_LISTING,
  SET_FAVOURITE,
  SET_FAVOURITES,
  REMOVE_FAVOURITE,
  REMOVE_FAVOURITES,
  REMOVE_LISTING,
  GET_GEOLOCATION,
} from './types';
import {SEARCH_LOCATION} from './asyncTypes';

export const setSearches = (payload: Array<object>) => ({
  type: SET_RECENT_SEARCHES,
  payload,
});

export const setSearch = (payload: object) => ({
  type: SET_RECENT_SEARCH,
  payload,
});

export const removeSearch = (payload: string) => ({
  type: REMOVE_RECENT_SEARCH,
  payload,
});

export const setSearchField = (payload: string) => ({
  type: SET_SEARCH_FIELD,
  payload,
});

export const setListing = (payload: JSON) => ({
  type: SET_LISTING,
  payload,
});

export const removeListing = () => ({
  type: REMOVE_LISTING,
});

export const setFavourite = (payload?: object) => ({
  type: SET_FAVOURITE,
  payload,
});

export const setFavourites = (payload: Array<object>) => ({
  type: SET_FAVOURITES,
  payload,
});

export const removeFavourite = (payload?: string) => ({
  type: REMOVE_FAVOURITE,
  payload,
});

export const removeFavourites = () => ({
  type: REMOVE_FAVOURITES,
});

export const setError = (payload: string) => ({
  type: SET_ERROR,
  payload,
});

export const searchLocationRequest = (payload?: object) => ({
  type: SEARCH_LOCATION.REQUEST,
  payload,
});

export const searchLocationSuccess = (payload: object) => ({
  type: SEARCH_LOCATION.SUCCESS,
  payload,
});

export const searchLocationFailure = (payload: object) => ({
  type: SEARCH_LOCATION.FAILURE,
  payload,
});

export const getGeolocation = () => ({
  type: GET_GEOLOCATION,
});
