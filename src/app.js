import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';
import { MuiThemeProvider } from 'material-ui/styles';
import './Styles/GlobalStyles';
import MuiTheme from '../src/Styles/MuiTheme';
import AppRouter from './Routers/AppRouters';
import configureStore from './Store';

require('babel-core/register');
require('babel-polyfill');

const store = configureStore();
const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={MuiTheme}>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
);
ReactDOM.render(<App />, document.getElementById('app'));
