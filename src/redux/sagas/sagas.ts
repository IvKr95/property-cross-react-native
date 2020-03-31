import {put, takeLatest, all, call} from 'redux-saga/effects';
import {SEARCH_LOCATION} from '../actions/asyncTypes';
import locationAPI from '../../api/locationApi';

function* searchLocation(action) {
  yield put({type: SEARCH_LOCATION.REQUEST});
  try {
    const data = yield call(locationAPI.getLocation, action.payload);
    yield put({type: SEARCH_LOCATION.SUCCESS, payload: data});
  } catch (error) {
    yield put({type: SEARCH_LOCATION.FAILURE, payload: error.message});
  }
}

function* watchSearchLocation() {
  yield takeLatest('SEARCH_LOCATION', searchLocation);
}

export default function* rootSaga() {
  yield all([watchSearchLocation()]);
}
