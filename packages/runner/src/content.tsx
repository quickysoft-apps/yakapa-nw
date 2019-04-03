import React, { useState } from 'react';
import { renderExtension } from '@yakapa/shared';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { blueGrey, purple } from '@material-ui/core/colors';

import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

interface Response {
  result: string;
}

const darkTheme = createMuiTheme({
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

const Content = () => {
  const [response, setResponse] = useState<Response>({ result: 'No result.' });

  return (
    <MuiThemeProvider theme={darkTheme}>
      <Button onClick={() => {}}>Run</Button>
      <Typography>{response.result}</Typography>
    </MuiThemeProvider>
  );
};

renderExtension(<Content />, module);
