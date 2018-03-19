/* eslint no-underscore-dangle: 0 */ // --> OFF
import { createStore, applyMiddleware } from 'redux';
import reduxImmutavleStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import rootReducer from '../Reducers';

export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, reduxImmutavleStateInvariant()),
  );
}
