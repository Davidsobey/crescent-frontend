import React from "react";
import { createMuiTheme } from "material-ui/styles";
import { amber, red } from "material-ui/colors";

const blackPalette = {
  50: "#030303",
  100: "#030303",
  200: "#030303",
  300: "#030303",
  400: "#030303",
  500: "#030303",
  600: "#030303",
  700: "#030303",
  800: "#020202",
  900: "#010101",
  A100: "#030303",
  A200: "#030303",
  A400: "#030303",
  A700: "#030303",
  contrastDefaultColor: "light"
};

const muiTheme = createMuiTheme({
  palette: {
    primary: blackPalette,
    secondary: red,
    accent: amber
  }
});

export default muiTheme;
