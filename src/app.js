import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css/normalize.css";
import { MuiThemeProvider } from "material-ui/styles";
import "./Styles/GlobalStyles.js";
import MuiTheme from "./Styles/MUITheme";
import AppRouter from "./Routers/AppRouter";
import configureStore from "./Store";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={MuiTheme}>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
);
ReactDOM.render(<App />, document.getElementById("app"));
