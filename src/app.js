import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import AppRouter from "./routers/AppRouter";
import { MuiThemeProvider } from "material-ui/styles";
import { createMuiTheme } from "material-ui/styles";
import { purple, red } from "material-ui/colors";
import "./styles/styles.scss";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      50: "#f8e0e1",
      100: "#eeb3b3",
      200: "#e28081",
      300: "#d64d4f",
      400: "#ce2629",
      500: "#c50003",
      600: "#bf0003",
      700: "#b80002",
      800: "#b00002",
      900: "#a30001",
      A100: "#ffcece",
      A200: "#ff9b9b",
      A400: "#ff6868",
      A700: "#ff4e4e",
      contrastDefaultColor: "light"
    },
    secondary: red
  },
  status: {
    danger: "red"
  }
});

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <AppRouter />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
