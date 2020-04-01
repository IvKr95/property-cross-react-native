import {all, call} from 'redux-saga/effects';
import {watchGetGeolocation, watchSearchLocation} from './sagas';

export default function* rootSaga() {
  yield all([call(watchSearchLocation), call(watchGetGeolocation)]);
}
