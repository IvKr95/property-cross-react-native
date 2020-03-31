import {
  SET_RECENT_SEARCHES,
  REMOVE_RECENT_SEARCHES,
  SET_SEARCH_FIELD,
  SET_ERROR,
  SET_LISTING,
  SET_FAVOURITE,
  SET_FAVOURITES,
  REMOVE_FAVOURITE,
  REMOVE_LISTING,
  SEARCH_LOCATION,
} from './types';

export const setSearches = (payload: Array<object>) => ({
  type: SET_RECENT_SEARCHES,
  payload,
});

export const removeSearches = (payload: null | undefined) => ({
  type: REMOVE_RECENT_SEARCHES,
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

export const setFavourite = () => ({
  type: SET_FAVOURITE,
});

export const setFavourites = (payload: Array<object>) => ({
  type: SET_FAVOURITES,
  payload,
});

export const removeFavourite = (payload: string) => ({
  type: REMOVE_FAVOURITE,
  payload,
});

export const setError = (payload: string) => ({
  type: SET_ERROR,
  payload,
});

export const searchLocation = (payload: object) => ({
  type: SEARCH_LOCATION,
  payload,
});
