import {put, takeLatest, call} from 'redux-saga/effects';
import {GET_GEOLOCATION} from '../actions/types';
import {SEARCH_LOCATION} from '../actions/asyncTypes';
import {
  searchLocationRequest,
  searchLocationSuccess,
  searchLocationFailure,
  setError,
} from '../actions/actionCreators';
import locationAPI from '../../api/locationApi';
import geolocationApi from '../../api/geolocationApi';
import {Action} from '../../interfaces';

function* searchLocation(action: Action) {
  try {
    const data = yield call(locationAPI.getLocation, action.payload);
    yield put(searchLocationSuccess(data));
  } catch (error) {
    yield put(searchLocationFailure(error.message));
  }
}

function* getGeolocation() {
  try {
    const position = yield call(geolocationApi.getPosition);
    yield put(searchLocationRequest({centre_point: position}));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchSearchLocation() {
  yield takeLatest(SEARCH_LOCATION.REQUEST, searchLocation);
}

export function* watchGetGeolocation() {
  yield takeLatest(GET_GEOLOCATION, getGeolocation);
}
