import React, { useState } from 'react';
import { renderExtension } from '@yakapa/shared';

import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

interface Response {
  result: string;
}

const Content = () => {
  const [response, setResponse] = useState<Response>({ result: 'No result.' });

  return (
    <div>
      <Button
        onClick={() => {
          setResponse({ result: 'yeeeeeah' });
        }}
      >
        Run
      </Button>
      <Typography>{response.result}</Typography>
    </div>
  );
};

renderExtension(<Content />, module);
