import locationAPI from '../../api/locationApi';
import {SEARCH_LOCATION} from './asyncTypes';
import {Dispatch} from 'redux';

export const searchLocation: Function = (params: object) => (
  dispatch: Dispatch,
): void => {
  dispatch({type: SEARCH_LOCATION.REQUEST});

  locationAPI.getLocation(params).then(
    result => {
      dispatch({
        type: SEARCH_LOCATION.SUCCESS,
        payload: result,
      });
    },
    error => {
      dispatch({type: SEARCH_LOCATION.FAILURE, payload: error.message});
    },
  );
};
