import React from 'react';
import { renderExtension } from '@yakapa/shared';

import Button from '@material-ui/core/Button';

const Content = () => {
  return (
    <Button
      onClick={() => {
        chrome.runtime.sendMessage(
          { script: 'console.log("hello world");' },
          response => {
            console.log('Script execution result', response);
          }
        );
      }}
    >
      Run
    </Button>
  );
};

renderExtension(<Content />, module);
