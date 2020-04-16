import {takeLatest, all, call} from 'redux-saga/effects';
import {runSaga} from 'redux-saga';
import {
  watchSearchLocation,
  watchGetGeolocation,
  searchLocation,
  getGeolocation,
} from '../src/redux/sagas/sagas';
import locationAPI from '../src/api/locationApi';
import geolocationApi from '../src/api/geolocationApi';
import {
  setError,
  searchLocationRequest,
  searchLocationSuccess,
  searchLocationFailure,
} from '../src/redux/actions/actionCreators';
import rootSaga from '../src/redux/sagas/rootSaga';

describe('rootSaga', () => {
  const iterator = rootSaga();
  it('waits for every effect to complete', () => {
    expect(iterator.next().value).toStrictEqual(
      all([call(watchSearchLocation), call(watchGetGeolocation)]),
    );
  });
  it('done on next iteration', () => {
    expect(iterator.next().done).toBeTruthy();
  });
});

describe('watchSearchLocation', () => {
  const iterator = watchSearchLocation();
  it('waits for every SEARCH_LOCATION_REQUEST action and calls searchLocation', () => {
    expect(iterator.next().value).toStrictEqual(
      takeLatest('SEARCH_LOCATION_REQUEST', searchLocation),
    );
  });
  it('done on next iteration', () => {
    expect(iterator.next().done).toBeTruthy();
  });
});

describe('watchGetGeolocation', () => {
  const iterator = watchGetGeolocation();
  it('waits for every GET_GEOLOCATION action and calls getGeolocation', () => {
    expect(iterator.next().value).toStrictEqual(
      takeLatest('GET_GEOLOCATION', getGeolocation),
    );
  });
  it('done on next iteration', () => {
    expect(iterator.next().done).toBeTruthy();
  });
});

describe('searchLocation', () => {
  const dispatchedActions = [];
  const mockStore = {
    dispatch: action => dispatchedActions.push(action),
  };

  it('loads and handles data', async () => {
    const mockData = {someData: {}};

    locationAPI.getLocation = jest.fn(() => Promise.resolve(mockData));

    await runSaga(mockStore, searchLocation, {
      type: 'SEARCH_LOCATION_REQUEST',
      payload: {},
    }).done;

    expect(locationAPI.getLocation.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(searchLocationSuccess(mockData));
  });

  it('terminates and handles an error', async () => {
    const mockData = {message: 'Some error'};

    locationAPI.getLocation = jest.fn(() => Promise.reject(mockData));

    await runSaga(mockStore, searchLocation, {
      type: 'SEARCH_LOCATION_REQUEST',
      payload: {},
    }).done;

    expect(locationAPI.getLocation.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(
      searchLocationFailure(mockData.message),
    );
  });
});

describe('getGeolocation', () => {
  const dispatchedActions = [];
  const mockStore = {
    dispatch: action => dispatchedActions.push(action),
  };

  it('successfully fetch geolocation', async () => {
    const mockData = 'Some coords';

    geolocationApi.getPosition = jest.fn(() => Promise.resolve(mockData));

    await runSaga(mockStore, getGeolocation);

    expect(geolocationApi.getPosition.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(
      searchLocationRequest({centre_point: mockData}),
    );
  });

  it('breaks with an error', async () => {
    const mockData = {message: 'Some error'};

    geolocationApi.getPosition = jest.fn(() => Promise.reject(mockData));

    await runSaga(mockStore, getGeolocation);

    expect(geolocationApi.getPosition.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(mockData.message));
  });
});
