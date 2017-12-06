import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import AppRouter from "./routers/AppRouter";
import { MuiThemeProvider } from "material-ui/styles";
import { createMuiTheme } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';
import "./styles/styles.scss";

const muiTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: grey,
    type: 'dark',
    
  },
  status: {
    danger: 'orange',
  },
});

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <AppRouter />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
