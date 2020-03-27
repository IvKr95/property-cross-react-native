import locationAPI from '../../api/locationApi';
import {Dispatch} from 'redux';

interface AsyncActions {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
  ENDED: string;
}

const getAsyncActions = (type: string) => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
  ENDED: `${type}_ENDED`,
});

export const searchLocation: Function = (params: object) => (
  dispatch: Dispatch,
): void => {
  const SEARCH_LOCATION = getAsyncActions('SEARCH_LOCATION');
  dispatch({type: SEARCH_LOCATION.REQUEST});

  locationAPI.getLocation(params).then(
    result => {
      if (result.listings) {
        dispatch({
          type: `${SEARCH_LOCATION.SUCCESS}_LISTINGS`,
          payload: result.listings,
        });
      } else {
        dispatch({
          type: `${SEARCH_LOCATION.SUCCESS}_LOCATIONS`,
          payload: result.locations,
        });
      }
      dispatch({type: SEARCH_LOCATION.ENDED});
    },
    error => {
      dispatch({type: SEARCH_LOCATION.FAILURE, payload: error.message});
      dispatch({type: SEARCH_LOCATION.ENDED});
    },
  );
};
