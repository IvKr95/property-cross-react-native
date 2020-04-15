import listingReducer from '../reducers/listingReducer';
import searchResultsReducer from '../reducers/resultsReducer';
import propSearchReducer from '../reducers/searchReducer';
import favouritesReducer from '../reducers/favouritesReducer';

class Store {
  constructor(state = {}, reducer) {
    this.state = state;
    this.reducer = reducer;
  }

  dispatch = action => {
    if (typeof action === 'function') {
      action(this.dispatch);
      return;
    }
    this.state = this.reducer(this.state, action);
  };

  getState() {
    return this.state;
  }
}

const reducer = (state, action) => ({
  listing: listingReducer(state, action),
  results: searchResultsReducer(state, action),
  search: propSearchReducer(state, action),
  favourites: favouritesReducer(state, action),
});

const store = new Store({}, reducer);

function crashReporter(store) {
  const next = store.dispatch;
  return function(action) {
    try {
      return next(action);
    } catch (err) {
      console.log(err);
    }
  };
}

const logger = ({dispatch, getState}) => {
  const next = dispatch;

  return function(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', getState());
    return result;
  };
};

function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  // Transform dispatch function with each middleware.
  middlewares.forEach(middleware => (store.dispatch = middleware(store)));
}

applyMiddleware(store, [logger, crashReporter]);
