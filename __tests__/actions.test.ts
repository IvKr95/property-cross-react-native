import * as actionCreators from '../src/redux/actions/actionCreators';

describe('setSearches returns actions', () => {
  it('returns an action with an array of objects', () => {
    expect(actionCreators.setSearches([{id: 'testID'}])).toMatchSnapshot();
  });

  it('returns an action with empty array', () => {
    expect(actionCreators.setSearches([])).toMatchSnapshot();
  });
});

describe('setFavourites returns actions', () => {
  it('returns an action with an array of objects', () => {
    expect(
      actionCreators.setFavourites([{someParam: 'someParam'}]),
    ).toMatchSnapshot();
  });

  it('returns an action with empty array', () => {
    expect(actionCreators.setFavourites([])).toMatchSnapshot();
  });
});

describe('removeFavourite returns an action', () => {
  it('returns an id in payload', () => {
    expect(actionCreators.removeFavourite('someId')).toMatchSnapshot();
  });

  it('returns undefined in payload', () => {
    expect(actionCreators.removeFavourite()).toMatchSnapshot();
  });
});

test('setSearch returns an action', () => {
  expect(actionCreators.setSearch({id: 'testID'})).toMatchSnapshot();
});

test('removeSearch returns an action', () => {
  expect(actionCreators.removeSearch('testId')).toMatchSnapshot();
});

test('setSearchField returns an action', () => {
  expect(actionCreators.setSearchField('testSearch')).toMatchSnapshot();
});

test('setListing returns an action', () => {
  expect(actionCreators.setListing({id: 'someId'})).toMatchSnapshot();
});

test('removeListing returns an action', () => {
  expect(actionCreators.removeListing()).toMatchSnapshot();
});

test('setFavourite returns an action', () => {
  expect(actionCreators.setFavourite({id: 'someId'})).toMatchSnapshot();
});

test('removeFavourites returns an action', () => {
  expect(actionCreators.removeFavourites()).toMatchSnapshot();
});

test('setError returns an action', () => {
  expect(actionCreators.setError('someError')).toMatchSnapshot();
});

test('getGeolocation return an action', () => {
  expect(actionCreators.getGeolocation()).toMatchSnapshot();
});
