import * as types from './types';
import {SEARCH_LOCATION} from './asyncTypes';
import {Action, RecentSearch, Listing} from '../../interfaces';

export const setSearches = (payload: RecentSearch[]): Action => ({
  type: types.SET_RECENT_SEARCHES,
  payload,
});

export const setSearch = (payload: RecentSearch): Action => ({
  type: types.SET_RECENT_SEARCH,
  payload,
});

export const removeSearch = (payload: string): Action => ({
  type: types.REMOVE_RECENT_SEARCH,
  payload,
});

export const setSearchField = (payload: string): Action => ({
  type: types.SET_SEARCH_FIELD,
  payload,
});

export const setListing = (payload: Listing): Action => ({
  type: types.SET_LISTING,
  payload,
});

export const removeListing = (): Action => ({
  type: types.REMOVE_LISTING,
});

export const setFavourite = (payload: Listing): Action => ({
  type: types.SET_FAVOURITE,
  payload,
});

export const setFavourites = (payload: Listing[]): Action => ({
  type: types.SET_FAVOURITES,
  payload,
});

export const removeFavourite = (payload?: string): Action => ({
  type: types.REMOVE_FAVOURITE,
  payload,
});

export const removeFavourites = (): Action => ({
  type: types.REMOVE_FAVOURITES,
});

export const setError = (payload: string): Action => ({
  type: types.SET_ERROR,
  payload,
});

export const searchLocationRequest = (payload: object): Action => ({
  type: SEARCH_LOCATION.REQUEST,
  payload,
});

export const searchLocationSuccess = (payload: object): Action => ({
  type: SEARCH_LOCATION.SUCCESS,
  payload,
});

export const searchLocationFailure = (payload: string): Action => ({
  type: SEARCH_LOCATION.FAILURE,
  payload,
});

export const getGeolocation = (): Action => ({
  type: types.GET_GEOLOCATION,
});
