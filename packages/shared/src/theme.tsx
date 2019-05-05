import { createMuiTheme } from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.2)'
      }
    },
    MuiTouchRipple: {
      ripple: {
        color: '#d4d4d4'
      }
    }
  },
  palette: {
    common: {
      black: 'rgba(0, 0, 0, 1)',
      white: 'rgba(255, 255, 255, 1)'
    },
    background: {
      paper: '#2d2d2d',
      default: '#303030' //used for content
    },
    primary: {
      light: '#d25ced',
      main: '#9e26ba',
      dark: '#6b0089',
      contrastText: '#d4d4d4'
    },
    secondary: {
      light: '#595959',
      main: '#2d2d2d', //used for submenu
      dark: '#131313', //use for menu
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
