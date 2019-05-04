import { createMuiTheme } from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    common: {
      black: 'rgba(0, 0, 0, 1)',
      white: 'rgba(255, 255, 255, 1)'
    },
    background: {
      paper: 'rgba(44, 44, 44, 1)',
      default: '#303030'
    },
    primary: {
      light: '#d25ced',
      main: '#9e26ba',
      dark: '#6b0089',
      contrastText: 'rgba(201, 248, 243, 1)'
    },
    secondary: {
      light: '#595959',
      main: '#303030',
      dark: '#070707',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(214, 214, 214, 0.87)',
      secondary: 'rgba(158, 158, 158, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    },
    type: 'dark'
  }
});
