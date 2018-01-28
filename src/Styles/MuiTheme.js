import React from "react";
import createMuiTheme from "material-ui/styles/createMuiTheme";

const blackPalette = {
  50: "#e6e7e8",
  100: "#c0c3c6",
  200: "#979ba0",
  300: "#6d7279",
  400: "#4d545d",
  500: "#2e3640",
  600: "#29303a",
  700: "#232932",
  800: "#1d222a",
  900: "#12161c",
  A100: "#619cff",
  A200: "#2e7cff",
  A400: "#005efa",
  A700: "#0054e0",
  contrastDefaultColor: "light"
};

const accent = {
  50: "#fffbf0",
  100: "#fef5da",
  200: "#feefc1",
  300: "#fee8a8",
  400: "#fde396",
  500: "#fdde83",
  600: "#fdda7b",
  700: "#fcd570",
  800: "#fcd166",
  900: "#fcc853",
  A100: "#ffffff",
  A200: "#ffffff",
  A400: "#fffcf5",
  A700: "#fff4db",
  contrastDefaultColor: "dark"
};

const secondary = {
  50: "#efe0e0",
  100: "#d6b3b3",
  200: "#bb8080",
  300: "#9f4d4d",
  400: "#8b2626",
  500: "#760000",
  600: "#6e0000",
  700: "#630000",
  800: "#590000",
  900: "#460000",
  A100: "#ff7a7a",
  A200: "#ff4747",
  A400: "#ff1414",
  A700: "#fa0000",
  contrastDefaultColor: "light"
};

const MuiTheme = createMuiTheme({
  palette: {
    primary: blackPalette,
    secondary: secondary,
    accent: accent
  }
});

export default MuiTheme;
