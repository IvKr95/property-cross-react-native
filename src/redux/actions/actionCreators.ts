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
import {Action, RecentSearch} from '../../interfaces';

export const setSearches = (payload: RecentSearch[]): Action => ({
  type: SET_RECENT_SEARCHES,
  payload,
});

export const setSearch = (payload: object): Action => ({
  type: SET_RECENT_SEARCH,
  payload,
});

export const removeSearch = (payload: string): Action => ({
  type: REMOVE_RECENT_SEARCH,
  payload,
});

export const setSearchField = (payload: string): Action => ({
  type: SET_SEARCH_FIELD,
  payload,
});

export const setListing = (payload: JSON): Action => ({
  type: SET_LISTING,
  payload,
});

export const removeListing = (): Action => ({
  type: REMOVE_LISTING,
});

export const setFavourite = (payload?: object): Action => ({
  type: SET_FAVOURITE,
  payload,
});

export const setFavourites = (payload: object[]): Action => ({
  type: SET_FAVOURITES,
  payload,
});

export const removeFavourite = (payload?: string): Action => ({
  type: REMOVE_FAVOURITE,
  payload,
});

export const removeFavourites = (): Action => ({
  type: REMOVE_FAVOURITES,
});

export const setError = (payload: string): Action => ({
  type: SET_ERROR,
  payload,
});

export const searchLocationRequest = (payload?: object): Action => ({
  type: SEARCH_LOCATION.REQUEST,
  payload,
});

export const searchLocationSuccess = (payload: object): Action => ({
  type: SEARCH_LOCATION.SUCCESS,
  payload,
});

export const searchLocationFailure = (payload: object): Action => ({
  type: SEARCH_LOCATION.FAILURE,
  payload,
});

export const getGeolocation = (): Action => ({
  type: GET_GEOLOCATION,
});
