import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, purple } from '@material-ui/core/colors';

export const darkTheme = createMuiTheme({
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
