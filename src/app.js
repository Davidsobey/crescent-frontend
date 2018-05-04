import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-core/register';
import 'babel-polyfill';

import 'normalize.css/normalize.css';
import { MuiThemeProvider } from 'material-ui/styles';
import './Styles/GlobalStyles';
import MuiTheme from '../src/Styles/MuiTheme';
import AppRouter from './Routers/AppRouters';
import configureStore from './Store/index';
import { saveState } from './localStorage';
import './web.config';

const store = configureStore();
store.subscribe(() => {
  saveState(store.getState());
});

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={MuiTheme}>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
