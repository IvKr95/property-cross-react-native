import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);

export default store;
