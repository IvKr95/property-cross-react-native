import {put, takeLatest, all, call} from 'redux-saga/effects';
import {GET_GEOLOCATION, SET_ERROR} from '../actions/types';
import {SEARCH_LOCATION} from '../actions/asyncTypes';
import locationAPI from '../../api/locationApi';
import geolocationApi from '../../api/geolocationApi';

function* searchLocation(action) {
  yield put({type: SEARCH_LOCATION.REQUEST});
  try {
    const data = yield call(locationAPI.getLocation, action.payload);
    yield put({type: SEARCH_LOCATION.SUCCESS, payload: data});
  } catch (error) {
    yield put({type: SEARCH_LOCATION.FAILURE, payload: error.message});
  }
}

function* getGeolocation() {
  try {
    const position = yield call(geolocationApi.getPosition);
    yield put({type: 'SEARCH_LOCATION', payload: {centre_point: position}});
  } catch (error) {
    yield put({type: SET_ERROR, payload: error});
  }
}

function* watchSearchLocation() {
  yield takeLatest('SEARCH_LOCATION', searchLocation);
}

function* watchGetGeolocation() {
  yield takeLatest(GET_GEOLOCATION, getGeolocation);
}

export default function* rootSaga() {
  yield all([watchSearchLocation(), watchGetGeolocation()]);
}
