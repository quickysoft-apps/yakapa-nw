import React, { useState } from 'react';
import { register } from 'ts-node';
import { renderExtension } from '@yakapa/shared';

import Button from '@material-ui/core/Button';

interface Response {
  result: string;
}

const Content = () => {
  const [response, setResponse] = useState<Response>({ result: 'No result.' });

  return (
    <div>
      <Button
        onClick={() => {
          const result = register().compile('return "Hello";', 'toto.js');
          setResponse({ result });
        }}
      >
        Run
      </Button>
      <span>{response.result}</span>
    </div>
  );
};

renderExtension(<Content />, module);
