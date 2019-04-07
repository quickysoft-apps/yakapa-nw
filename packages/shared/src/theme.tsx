import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { blueGrey, purple } from '@material-ui/core/colors';

const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700]
    },
    secondary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700]
    },
    type: 'dark'
  }
});

export const MainTheme = <T extends { children: any }>(props: T) => {
  return <MuiThemeProvider theme={darkTheme}>{props.children}</MuiThemeProvider>;
};
