/* eslint no-underscore-dangle: 0 */ // --> OFF
import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import { loadState } from '../localStorage';
import rootReducer from '../Reducers';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())),
  );
}
